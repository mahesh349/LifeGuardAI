from flask import Flask, request, jsonify
from sklearn.ensemble import BaggingClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from flask_cors import CORS

import warnings

app = Flask(__name__)
CORS(app)
# High Chances of probability
# {
#     "age": 55,
#     "gender": 1,
#     "height": 165,
#     "weight": 70,
#     "ap_hi": 140,
#     "ap_lo": 90,
#     "cholesterol": 3,
#     "gluc": 3,
#     "smoke": 0,
#     "alco": 0,
#     "active": 0
# }
import joblib
svm_model=joblib.load("./machine_learning_backend/ML_Models/model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = [int(data['age']), data['gender'], data['height'], data['weight'], data['ap_hi'], data['ap_lo'],
                    data['cholesterol'], data['gluc'], data['smoke'], data['alco'], data['active']]
        prediction = svm_model.predict([features])
        threshold=0.8
        probability = svm_model.predict_proba([features])
        if probability[0][prediction][0] >= threshold and prediction[0] == 1:
            classification_result = "High chances for cardiovascular disorder"
        else:
            classification_result = "Less chances for cardiovascular disorder"

        return jsonify({'prediction': int(prediction[0]),'probability':float(probability[0][prediction][0]),'classification':classification_result})  # Convert numpy int64 to Python int
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)