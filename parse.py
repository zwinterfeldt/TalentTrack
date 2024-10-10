import os.path
import base64
import re
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
 
# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
 
def authenticate_gmail_api():
    """Authenticate the user and return the service to interact with Gmail API"""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=8080)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
 
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
 
    if not messages:
        print("No messages found in the past 24 hours.")
    else:
        for message_meta in messages:
            message = service.users().messages().get(userId='me', id=message_meta['id'], format='full').execute()
            print("Message snippet: ", message.get('snippet', ''))
           
            payload = message.get('payload', {})
            email_body = extract_email_body(payload.get('parts', []))
            print("Message body: ", email_body)
            print("-" * 50)
 
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
       
        print("Latest message body: ", email_body)
        print("-" * 50)
 
if __name__ == '__main__':
    gmail_service = authenticate_gmail_api()
    get_latest_email(gmail_service)