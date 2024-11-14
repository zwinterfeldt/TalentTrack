import os.path
import base64
import re
import dotenv
from google.auth.exceptions import RefreshError
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import json
from openai import OpenAI

dotenv.load_dotenv('.env')

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
 
# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
 
def authenticate_gmail_api():
    """Authenticate the user and refresh the access token each time the script is run."""
    creds = None
    
    # Load existing credentials from token.json
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    # Force refresh the access token even if it's not expired
    if creds and creds.refresh_token:
        try:
            print("Forcing access token refresh...")
            creds.refresh(Request())  # This will force-refresh the access token
            print("Token refreshed successfully.")
        except RefreshError:
            print("Failed to refresh token. The refresh token might be invalid or expired.")
            creds = None  # Force re-authentication if refresh fails

    # If there are no valid credentials, initiate the OAuth flow to get new tokens
    if not creds or not creds.valid:
        print("Authenticating user...")
        flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
        creds = flow.run_local_server(port=8080, access_type='offline', prompt='consent')

    # Save the refreshed or newly obtained credentials back to token.json
    with open('token.json', 'w') as token:
        print("writing ")
        token.write(creds.to_json())
    
    # Build and return the Gmail service instance
    service = build('gmail', 'v1', credentials=creds)
    return service
 
def extract_email_body(parts):
    """Extract and decode the plain text email body from all parts and return the concatenated result"""
    body = ""
    for part in parts:
        mime_type = part.get('mimeType')
        data = part['body'].get('data')
 
        # Check for plain text content
        if mime_type == 'text/plain' and data:
            decoded_data = base64.urlsafe_b64decode(data.encode('ASCII')).decode('utf-8')
            body += decoded_data
 
        # If it's a nested message (e.g., multipart/alternative), process its parts recursively
        elif mime_type in ['multipart/alternative', 'multipart/mixed']:
            body += extract_email_body(part.get('parts', []))
 
    return body
 
def get_emails_in_past_24_hours(service):
    """Retrieve all emails from the user's Gmail inbox in the past 24 hours"""
    query = 'newer_than:1d'
    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])
    emails = []
    if not messages:
        print("No messages found in the past 24 hours.")
    else:
        for message_meta in messages:
            message = service.users().messages().get(userId='me', id=message_meta['id'], format='full').execute()
            print("Message snippet: ", message.get('snippet', ''))
           
            payload = message.get('payload', {})
            email_body = extract_email_body(payload.get('parts', []))
            emails.append(email_body)
            #print("Message body: ", email_body)
            #print("-" * 50)
    return emails

def extract_original_sender(headers, body):
    """Extract the original sender's email address from headers or fallback to the body content."""
    # Initialize a list to store any found email addresses
    sender_emails = []
   
    # Search for 'From:' pattern in body to find all potential original senders
    matches = re.findall(r"From:\s*(.*?)(?:<|\s|$)([\w\.-]+@[\w\.-]+\.[\w]+)", body, re.IGNORECASE)
    for match in matches:
        sender_emails.append(match[1])  # Append the email address part
   
    # If multiple 'From:' patterns are found, return the last one (assumed original sender)
    if sender_emails:
        return sender_emails[-1]
   
    # If no 'From:' patterns are found in the body, return None
    return None

def extract_information_from_email(email_body):
    # Initialize the OpenAI client with your API key
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    prompt = f"""
    You are an AI that helps extract information from soccer recruitment emails. The email is typically written by a high school student to a soccer coach. Please analyze the email and determine if it is a soccer recruitment-related email. 

    If it is a recruitment-related email, extract the information and fill out the following fields. If any information is missing, leave those fields as empty strings ("") or null, but keep the structure the same. Do not modify the field names or order.

    If the email is not related to soccer recruitment, still return the following JSON object with all fields as empty strings ("") or null.

    Fields:
    - First Name
    - Last Name
    - GPA
    - Graduation year
    - High School
    - High School Coach Name
    - Club Team Name
    - Club Coach Name
    - Club Coach Email
    - Position
    - Parents Name
    - Contact Information (Email/Phone Number) with two keys: "Email" and "Phone Number"
    
    Here is the email body:
    {email_body}

    Return the information as a well-formatted JSON object, with all fields in the order provided. If the email is not recruitment-related, ensure all fields are empty strings or null.
    """


    # Call the OpenAI API to generate a completion
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,  # You can use the actual email content here
            }
        ],
        model="gpt-3.5-turbo",
    )

    # Extract the generated text from the API response
    generated_text = chat_completion.choices[0].message.content
    
    # Print the extracted text
    print("Generated response from OpenAI:")
    #print(generated_text)

    return generated_text
 
 
def get_latest_email(service):
    """Retrieve the latest email from the user's Gmail inbox."""
    results = service.users().messages().list(userId='me', maxResults=1).execute()
    messages = results.get('messages', [])
 
    if not messages:
        print("No messages found.")
    else:
        message = service.users().messages().get(userId='me', id=messages[0]['id'], format='full').execute()
        print("Latest message snippet: ", message.get('snippet', ''))
 
        payload = message.get('payload', {})
        headers = payload.get('headers', [])
        email_body = extract_email_body(payload.get('parts', []))
       
        # Extract original sender's email
        original_sender = extract_original_sender(headers, email_body)
        print("Original sender email address: ", original_sender)
        return (email_body)
        
        print("-" * 50)
 
def main():
    gmail_service = authenticate_gmail_api()
    email_body = get_latest_email(gmail_service)
    extracted_info = extract_information_from_email(email_body)
    extracted_info_json = json.loads(extracted_info)
    print(extracted_info_json)