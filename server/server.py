from flask import Flask, request, jsonify
import data

app = Flask(__name__)


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    locations = data.get_location_names()
    response = jsonify({
        "locations": data.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    sqft = request.form['sqft']
    location = request.form['location']
    bhk = request.form['bhk']
    bath = request.form['bath']

    response = jsonify({
        "estimated_price": data.get_estimated_price(sqft, location, bhk, bath)
    })
    print(sqft, location, bhk, bath)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Flask Python Server")
    data.load_saved_artifacts()
    print(data.get_estimated_price(1000, "Kalhalli", 2, 2))
    app.run()
