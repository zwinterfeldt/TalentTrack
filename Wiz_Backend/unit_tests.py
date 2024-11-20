import unittest
from unittest.mock import patch
from app import db
from app.models import users, roles, user_roles, user_emails, email_text, players, comments
from app import create_app
import os

class UnitTests(unittest.TestCase):
    def setUp(self):
        os.environ['DATABASE_URL'] = 'sqlite:///:memory:'

        self.app = create_app()
        self.app.testing = True

        self.client = self.app.test_client()


    @patch('app.models.users.query.get')
    def test_get_user_valid(self, mock_get):
        mock_user = users(user_id=1, username="testusername")
        mock_get.return_value = mock_user

        response = self.app.get('/user/1')

        self.assertEqual(response.status_code, 200)
        self.assertIn('username', response.json)
        self.assertEqual(response.json['username'], 'testusername')


