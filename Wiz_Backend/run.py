from app import create_app
from flask_cors import CORS

# create app
app = create_app()

CORS(app, supports_credentials=True, origins="http://localhost:3000")

# run app with debug
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
