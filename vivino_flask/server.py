from flask import Flask;

app = Flask(__name__)


@app.route("/database")
def members():
    return {"Big Man Tings": ["Sam","Alistair","Carmen"]}

if __name__ == "__main__":
        app.run(debug=True)

#test