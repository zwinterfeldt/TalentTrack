import json
import psycopg2
from dotenv import load_dotenv
import os
import parse

load_dotenv()

database = os.getenv("DB_NAME")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")

def connect_to_db():
    try:
        conn = psycopg2.connect(
            database=database,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("Connected to the database successfully")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def insert_data(cursor, player):
    try:
        cursor.execute(
            """
            INSERT INTO players (
                source_email_id, first_name, last_name, 
                address, grad_year, gpa, player_position, 
                high_school, high_school_coach_name, high_school_coach_email, 
                club_team, club_team_coach_name, club_team_coach_email, 
                parents_names, parents_contacts, stars
            )
            VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                None,  # source_email_id: Replace with actual email ID or None if not available
                player.get('First Name'),
                player.get('Last Name'),
                player.get('Address', ''),
                int(player.get('Graduation year')) if player.get('Graduation year') else None,
                float(player.get('GPA')) if player.get('GPA') else None,  # Convert GPA to float for DECIMAL(3,2)
                player.get('Position'),
                player.get('High School'),
                player.get('High School Coach Name'),
                player.get('High School Coach Email', ''),  
                player.get('Club Team Name'),
                player.get('Club Coach Name'),
                player.get('Club Coach Email', ''),
                player.get('Parents Name', ''),
                player.get('Contact Information', {}).get('Phone Number', ''),
                int(player.get('Stars')) if player.get('Stars') else None  # Handle stars as an integer or NULL
            )
        )
    except Exception as e:
        print(f"Error inserting data: {e}")

def is_recruitment_email(player_data):
    """Check if the email contains relevant recruitment information."""
    if not player_data:
        return False  # Return False if player_data is None
    # List of fields to check
    relevant_fields = [
        'First Name', 'Last Name', 'GPA', 'Graduation year', 
        'High School', 'High School Coach Name', 'Club Team Name', 
        'Club Coach Name', 'Club Coach Email', 'Position', 
        'Parents Name', 'Contact Information'
    ]
    
    # If all relevant fields are empty, it's not a recruitment email
    return any(player_data.get(field) for field in relevant_fields)

def populate_database(player_data, conn):
    if not is_recruitment_email(player_data):
        print("not recruitment")
        return
    try:
        
        cursor = conn.cursor()
        insert_data(cursor, player_data)  # Insert a single player record
        conn.commit() 
        print("Data inserted")
        cursor.close()
    except Exception as e:
        print(f"Error populating the database: {e}")

if __name__ == "__main__":
    email = parse.main()  # Should return a single dictionary
    print(email)
    connection = connect_to_db()

    if connection:
        populate_database(email, connection)  # Pass the dictionary directly
        connection.close()
    else:
        print("Database connection failed")