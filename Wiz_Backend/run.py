from app import create_app

# create app
app = create_app()

# run app with debug
if __name__ == '__main__':
    app.run(debug=True)
