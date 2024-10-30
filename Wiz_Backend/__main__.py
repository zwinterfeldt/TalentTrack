# This file can be ignored!!
# Keeping it in the repo for reference
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Allow CORS from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Mavericks2024!@database-1.cfmcu4ekyg1w.us-east-2.rds.amazonaws.com:5432/TTdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()

db.init_app(app)

# Models

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
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())

# Comments model
class comments(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('players.player_id'), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


with app.app_context():
    db.create_all()

# 'GET' Endpoints

# Get all users
@app.route("/api/v1/users", methods = ["GET"])
def get_users():
    all_users = users.query.all()  # Query all users
    return jsonify([{
        'user_id': user.user_id,
        'username': user.username,
        'created_at': user.created_at.isoformat(),
        'last_login': user.last_login.isoformat() if user.last_login else None
    } for user in all_users])

# Get user by id
@app.route("/api/v1/user/<int:user_id>", methods = ["GET"])
def get_user(user_id):
    user = users.query.get(user_id)  # Query user by ID
    if user:
        return jsonify({
            'user_id': user.user_id,
            'username': user.username,
            'created_at': user.created_at.isoformat(),
            'last_login': user.last_login.isoformat() if user.last_login else None
        })
    return jsonify({'message': 'User not found'}), 404

# Get all roles
@app.route("/api/v1/roles", methods = ["GET"])
def get_roles():
    all_roles = roles.query.all()  # Query all roles
    return jsonify([{
        'role_id': role.role_id,
        'role_name': role.role_name
    } for role in all_roles])

# Get role by id
@app.route("/api/v1/roles/<int:role_id>", methods = ["GET"])
def get_role(role_id):
    role = roles.query.get(role_id)  # Query role by ID
    if role:
        return jsonify({
            'role_id': role.role_id,
            'role_name': role.role_name
        })
    return jsonify({'message': 'Role not found'}), 404

# Get all user roles
@app.route("/api/v1/userroles", methods = ["GET"])
def get_user_roles():
    all_user_roles = user_roles.query.all()  # Query all user roles
    return jsonify([{
        'user_role_id': user_role.user_role_id,
        'user_id': user_role.user_id,
        'role_id': user_role.role_id,
        'assigned_at': user_role.assigned_at.isoformat()
    } for user_role in all_user_roles])

# Get user role by id
def get_user_role(user_role_id):
    user_role = user_roles.query.get(user_role_id)  # Query user role by ID
    if user_role:
        return jsonify({
            'user_role_id': user_role.user_role_id,
            'user_id': user_role.user_id,
            'role_id': user_role.role_id,
            'assigned_at': user_role.assigned_at.isoformat()
        })
    return jsonify({'message': 'User role not found'}), 404

# Get all user emails
@app.route("/api/v1/useremails", methods = ["GET"])
def get_user_emails():
    all_user_emails = user_emails.query.all()  # Query all user emails
    return jsonify([{
        'user_email_id': user_email.user_email_id,
        'user_id': user_email.user_id,
        'email_address': user_email.email_address
    } for user_email in all_user_emails])

# Get user email by id
@app.route("/api/v1/useremails/<int:user_email_id>", methods = ["GET"])
def get_user_email(user_email_id):
    user_email = user_emails.query.get(user_email_id)  # Query user email by ID
    if user_email:
        return jsonify({
            'user_email_id': user_email.user_email_id,
            'user_id': user_email.user_id,
            'email_address': user_email.email_address
        })
    return jsonify({'message': 'User email not found'}), 404


# Get email texts
@app.route("/api/v1/emailtexts", methods = ["GET"])
def get_email_texts():
    email_texts = email_text.query.all() # Query all email texts
    return jsonify([{
        'email_id': email_text.email_id,
        'user_email_id': email_text.user_email_id,
        'email_text': email_text.email_text,
        'parsed_at': email_text.parsed_at.isoformat()
    } for email_text in email_texts])

# Get email text by id
@app.route("/api/v1/emailtexts/<int:email_id>", methods = ["GET"])
def get_email_text(email_id):
    email_texti = email_text.query.get(email_id)  # Query email text by ID
    if email_text:
        return jsonify({
            'email_id': email_texti.email_id,
            'user_email_id': email_texti.user_email_id,
            'email_text': email_texti.email_text,
            'parsed_at': email_texti.parsed_at.isoformat()
        })
    return jsonify({'message': 'Email text not found'}), 404


# Get all players
@app.route("/api/v1/players", methods = ["GET"])
def get_players():
    all_players = players.query.all()
    return jsonify([{
        'player_id': player.player_id,
        'user_id': player.user_id,
        'source_email_id': player.source_email_id,
        'first_name': player.first_name,
        'last_name': player.last_name,
        'address': player.address,
        'grad_year': player.grad_year,
        'gpa': str(player.gpa),  # Convert Decimal to string for JSON serialization
        'player_position': player.player_position,
        'high_school': player.high_school,
        'high_school_coach_name': player.high_school_coach_name,
        'high_school_coach_email': player.high_school_coach_email,
        'club_team': player.club_team,
        'club_team_coach_name': player.club_team_coach_name,
        'club_team_coach_email': player.club_team_coach_email,
        'parents_names': player.parents_names,
        'parents_contacts': player.parents_contacts,
        'stars': player.stars,
        'last_updated': player.last_updated.isoformat()  # Convert timestamp to ISO format
    } for player in all_players])

# Get player by id
@app.route("/api/v1/players/<int:player_id>", methods=['GET'])
def get_player(player_id):
    player = players.query.get(player_id)  # Query player by ID
    if player:
        return jsonify({
            'player_id': player.player_id,
            'user_id': player.user_id,
            'source_email_id': player.source_email_id,
            'first_name': player.first_name,
            'last_name': player.last_name,
            'address': player.address,
            'grad_year': player.grad_year,
            'gpa': str(player.gpa),
            'player_position': player.player_position,
            'high_school': player.high_school,
            'high_school_coach_name': player.high_school_coach_name,
            'high_school_coach_email': player.high_school_coach_email,
            'club_team': player.club_team,
            'club_team_coach_name': player.club_team_coach_name,
            'club_team_coach_email': player.club_team_coach_email,
            'parents_names': player.parents_names,
            'parents_contacts': player.parents_contacts,
            'stars': player.stars,
            'last_updated': player.last_updated.isoformat()
        })
    return jsonify({'message': 'Player not found'}), 404

# Get all comments
@app.route("/api/v1/comments", methods = ["GET"])
def get_comments():
    all_comments = comments.query.all()  # Query all comments
    return jsonify([{
        'comment_id': comment.comment_id,
        'player_id': comment.player_id,
        'comment_text': comment.comment_text,
        'created_at': comment.created_at.isoformat()
    } for comment in all_comments])

# Get comment by id
@app.route("/api/v1/comments/<int:comment_id>", methods = ["GET"])
def get_comment(comment_id):
    comment = comments.query.get(comment_id)  # Query comment by ID
    if comment:
        return jsonify({
            'comment_id': comment.comment_id,
            'player_id': comment.player_id,
            'comment_text': comment.comment_text,
            'created_at': comment.created_at.isoformat()
        })
    return jsonify({'message': 'Comment not found'}), 404

# POST endpoints
# Create user
@app.route("/api/v1/users", methods = ["POST"])
def post_user():
    new_user = request.get_json()
    if not new_user or 'username' not in new_user or 'user_password' not in new_user:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = users.query.filter_by(username=new_user['username']).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409

    user = users()
    user.username = new_user['username']
    user.user_password = new_user['user_password']
    user.created_at = datetime.utcnow()

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'user_id': user.user_id,
        'username': user.username,
        'created_at': user.created_at
    }), 201

# Create roles
@app.route("/api/v1/roles", methods = ["POST"])
def post_role():
    new_role = request.get_json()
    if not new_role or 'role_name' not in new_role:
        return jsonify({'error': 'Role name is required'}), 400

    role = roles(
        role_name=new_role.get('role_name')
    )

    db.session.add(role)
    db.session.commit()

    return jsonify({
        'role_id': role.role_id,
        'role_name': role.role_name
    }), 201

# Create user roles
@app.route("/api/v1/userroles", methods = ["POST"])
def post_user_role():
    new_user_role = request.get_json()
    if not new_user_role or 'user_id' not in new_user_role or 'role_id' not in new_user_role:
        return jsonify({'error': 'User id and role id are required'}), 400

    user_role = user_roles(
        user_id=new_user_role.get('user_id'),
        role_id=new_user_role.get('role_id')
    )

    db.session.add(user_role)
    db.session.commit()

    return jsonify({
        'user_role_id': user_role.role_id,
        'user_id': user_role.user_id,
        'role_id': user_role.role_id
    }), 201



# Create user emails
@app.route("/api/v1/useremails", methods = ["POST"])
def post_user_email():
    new_user_email = request.get_json()
    if not new_user_email or 'user_id' not in new_user_email or 'email_address' not in new_user_email:
        return jsonify({'error': 'User id and email address are required'}), 400

    existing_email = user_emails.query.filter_by(user_emails=new_user_email['user_emails']).first()
    if existing_email:
        return jsonify({'error': 'Username already exists'}), 409

    user_email = user_emails()
    user_email.user_id = new_user_email['user_id']
    user_email.email_address = new_user_email['email_address']

    db.session.add(user_email)
    db.session.commit()

    return jsonify({
        'user_email_id': user_email.user_email_id,
        'user_id': user_email.user_id,
        'email_address': user_email.email_address
    }), 201

# Create email texts
@app.route("/api/v1/emailtexts", methods = ["POST"])
def post_email_texts():
    new_email_text = request.get_json()
    if not new_email_text or 'user_email_id' not in new_email_text or 'email_text' not in new_email_text:
        return jsonify({'error': 'User email id and email text are required'}), 400

    email_text_class = email_text(
        user_email_id=new_email_text.get('user_email_id'),
        email_text=new_email_text.get('email_text')
    )

    db.session.add(email_text_class)
    db.session.commit()

    return jsonify({
        'email_id': email_text_class.email_id,
        'user_email_id': email_text_class.user_email_id,
        'email_text': email_text_class.user_email_id,
        'parsed_at': email_text_class.parsed_at
    }), 201




# Create players
@app.route("/api/v1/players", methods = ["POST"])
def post_player():
    new_player = request.get_json()
    if not new_player:
        return jsonify({'error': ' are required'}), 400

    player = players(
        user_id=new_player.get('user_id'),
        source_email_id=new_player.get('source_email_id'),
        first_name=new_player['first_name'],
        last_name=new_player['last_name'],
        address=new_player.get('address'),
        grad_year=new_player['grad_year'],
        gpa=new_player['gpa'],
        player_position=new_player['player_position'],
        high_school=new_player['high_school'],
        high_school_coach_name=new_player.get('high_school_coach_name'),
        high_school_coach_email=new_player.get('high_school_coach_email'),
        club_team=new_player.get('club_team'),
        club_team_coach_name=new_player.get('club_team_coach_name'),
        club_team_coach_email=new_player.get('club_team_coach_email'),
        parents_names=new_player.get('parents_names'),
        parents_contacts=new_player.get('parents_contacts'),
        stars=new_player.get('stars')
    )

    db.session.add(player)
    db.session.commit()

    return jsonify({
        'player_id': player.player_id,
        'first_name': player.first_name,
        'last_name': player.last_name,
        'grad_year': player.grad_year,
        'gpa': str(player.gpa),
        'player_position': player.player_position,
        'high_school': player.high_school,
        'last_updated': player.last_updated.isoformat()
    }), 201

# Create comments
@app.route("/api/v1/comments", methods = ["POST"])
def post_comments():
    new_comment = request.get_json()
    if not new_comment or 'player_id' not in new_comment or 'comment_text' not in new_comment:
        return jsonify({'error': 'Player id and comment text are required'}), 400

    comment = comments(
        player_id=new_comment.get('player_id'),
        comment_text=new_comment.get('comment_text')
    )

    db.session.add(comment)
    db.session.commit()

    return jsonify({
        'comment_id': comment.comment_id,
        'player_id': comment.player_id,
        'comment_text': comment.comment_text,
        'created_at': comment.created_at
    }), 201

# Delete user by id
@app.route("/api/v1/users/<int:user_id>", methods=['DELETE'])
def delete_user(user_id):
    user = users.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'message': 'User not found'}), 404

# Delete role by id
@app.route("/api/v1/roles/<int:role_id>", methods=['DELETE'])
def delete_role(role_id):
    role = roles.query.get(role_id)
    if role:
        db.session.delete(role)
        db.session.commit()
        return jsonify({'message': 'Role deleted successfully'}), 200
    return jsonify({'message': 'Role not found'}), 404

# Delete user role by id
@app.route("/api/v1/userroles/<int:user_role_id>", methods=['DELETE'])
def delete_user_role(user_role_id):
    user_role = user_roles.query.get(user_role_id)
    if user_role:
        db.session.delete(user_role)
        db.session.commit()
        return jsonify({'message': 'User role deleted successfully'}), 200
    return jsonify({'message': 'User role not found'}), 404

# Delete user email by id
@app.route("/api/v1/useremails/<int:user_email_id>", methods=['DELETE'])
def delete_user_email(user_email_id):
    user_email = user_emails.query.get(user_email_id)
    if user_email:
        db.session.delete(user_email)
        db.session.commit()
        return jsonify({'message': 'User email deleted successfully'}), 200
    return jsonify({'message': 'User email not found'}), 404

# Delete email text by id
@app.route("/api/v1/emailtexts/<int:email_id>", methods=['DELETE'])
def delete_email_text(email_id):
    email = email_text.query.get(email_id)
    if email:
        db.session.delete(email)
        db.session.commit()
        return jsonify({'message': 'Email text deleted successfully'}), 200
    return jsonify({'message': 'Email text not found'}), 404

# Delete player by id
@app.route("/api/v1/players/<int:player_id>", methods=['DELETE'])
def delete_player(player_id):
    player = players.query.get(player_id)
    if player:
        db.session.delete(player)
        db.session.commit()
        return jsonify({'message': 'Player deleted successfully'}), 200
    return jsonify({'message': 'Player not found'}), 404

# Delete comment by id
@app.route("/api/v1/comments/<int:comment_id>", methods=['DELETE'])
def delete_comment(comment_id):
    comment = comments.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200
    return jsonify({'message': 'Comment not found'}), 404

if __name__ == '__main__':
    app.run(host= "0.0.0.0", port=50100, debug=True)

