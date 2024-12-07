from app import create_app
from flask_cors import CORS
import os
from dotenv import load_dotenv

# create app

app = create_app()

frontend_url = os.environ.get('FRONTEND_URL')

CORS(app, supports_credentials=True, origins=frontend_url)

# run app with debug
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
