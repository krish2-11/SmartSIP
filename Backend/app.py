from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np

# Load models and data
kmeans = joblib.load('kmeans_model.pkl')
scaler = joblib.load('scaler.pkl')
lgb_model = joblib.load('lightgbm_model.pkl')
df = pd.read_csv('user_clusters_scores.csv')

# Create Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return "🟢 User SIP Recommendation API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input JSON
        data = request.get_json()

        # Extract and convert inputs
        age = int(data['Age'])
        income = float(data['Monthly Income (INR)'])
        risk = data['Risk Appetite']
        horizon = int(data['Time Horizon (Years)'])
        goal = data['Investment Goal']

        # Encode categorical features
        risk_map = {'Low': 0, 'Moderate': 1, 'High': 2}
        goal_map = {'Wealth Creation': 0, 'Tax Saving': 1, 'Retirement': 2, 'Other': 3}

        if risk not in risk_map or goal not in goal_map:
            return jsonify({'error': 'Invalid Risk Appetite or Investment Goal'}), 400

        risk_encoded = risk_map[risk]
        goal_encoded = goal_map[goal]

        # Prepare input data
        user_data = [[age, income, risk_encoded, horizon, goal_encoded]]
        user_scaled = scaler.transform(user_data)

        # Predict cluster
        predicted_cluster = kmeans.predict(user_scaled)[0]

        # Predict score
        predicted_score = lgb_model.predict(user_data)[0]

        # Recommend top users in the same cluster (or mock funds based on your implementation)
        suggestions = df[df['Cluster'] == predicted_cluster].sort_values(by='Predicted Score', ascending=False).head(3)

        # You could map these back to 'Recommended SIP Funds' if that column is available
        result = []
        for _, row in suggestions.iterrows():
            result.append({
                "Age": row['Age'],
                "Monthly Income (INR)": row['Monthly Income (INR)'],
                "Risk Appetite": row['Risk Appetite'],
                "Time Horizon (Years)": row['Time Horizon (Years)'],
                "Investment Goal": row['Investment Goal'],
                "Recommended SIP Funds": row['Recommended SIP Funds'],
                "Predicted Score": row['Predicted Score']
            })

        return jsonify({
            'top_suggestions': result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
