from .__init__ import db
from flask import jsonify, request
from .models import users, user_roles, user_emails, email_text, players, comments, roles
from datetime import datetime

# def for creating routes in __init__.py file
def create_routes(app):
    # GET endpoints
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

    # Create player
    @app.route("/api/v1/players", methods=["POST"])
    def post_player():
        new_player = request.get_json()
        
        if not new_player:
            return jsonify({'error': 'Player data is required'}), 400

        # Handle non-integer and null values explicitly
        source_email_id = new_player.get('source_email_id')
        if source_email_id in ['none', 'None', None]:
            source_email_id = None  # Convert 'none' or 'None' to Python None for SQLAlchemy

        # Handle the same for stars
        stars = new_player.get('stars')
        if stars in ['none', 'None', None]:
            stars = None

        player = players(
            user_id=new_player.get('user_id'),
            source_email_id=source_email_id,
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
            stars=stars  # Make sure 'stars' can be set to None
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

    #DELETE enpoints
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