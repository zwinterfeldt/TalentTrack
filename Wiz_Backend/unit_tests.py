import unittest
from unittest.mock import patch
from app import db
from app.models import users, roles, user_roles, user_emails, email_text, players, comments
from app import create_app
import os

class UnitTests(unittest.TestCase):
    def setUp(self):
        #os.environ['DATABASE_URL'] = 'sqlite:///:memory:'

        self.app = create_app()
        self.app.testing = True

        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

        self.client = self.app.test_client()


    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()


    @patch('app.routes.roles.query.get')
    def test_get_roles_valid(self, mock_get):
        mock_role = roles(role_id=1, role_name="testname")
        mock_get.return_value = mock_role

        response = self.client.get('/api/v1/roles/1')

        print(f"Mock call count: {mock_get.call_count}")

        self.assertEqual(response.status_code, 200)
        self.assertIn('role_name', response.json)
        self.assertEqual(response.json['role_name'], 'testname')



