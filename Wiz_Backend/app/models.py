from datetime import datetime
from . import db

# Users Model
class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)

# Roles model
class roles(db.Model):
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(255), unique=True, nullable=False)

# User Roles model
class user_roles(db.Model):
    user_role_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'), nullable=False)
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)

# User emails model
class user_emails(db.Model):
    user_email_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    email_address = db.Column(db.String(255), nullable=False)

# Email Text model
class email_text(db.Model):
    email_id = db.Column(db.Integer, primary_key=True)
    user_email_id = db.Column(db.Integer, db.ForeignKey('user_emails.user_email_id'), nullable=False)
    email_text = db.Column(db.Text, nullable=False)
    parsed_at = db.Column(db.DateTime, default=datetime.utcnow)

# Players Model
class players(db.Model):
    player_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=True)
    source_email_id = db.Column(db.Integer, db.ForeignKey('email_text.email_id'), nullable=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    grad_year = db.Column(db.Integer)
    gpa = db.Column(db.Numeric(3, 2))
    player_position = db.Column(db.String(255))
    high_school = db.Column(db.String(255))
    high_school_coach_name = db.Column(db.String(255))
    high_school_coach_email = db.Column(db.String(255))
    club_team = db.Column(db.String(255))
    club_team_coach_name = db.Column(db.String(255))
    club_team_coach_email = db.Column(db.String(255))
    parents_names = db.Column(db.String(255))
    parents_contacts = db.Column(db.String(255))
    stars = db.Column(db.Integer)
    jersey_number = db.Column(db.Integer)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())

# Comments model
class comments(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)