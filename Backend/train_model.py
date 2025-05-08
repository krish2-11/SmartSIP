import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
import lightgbm as lgb
import joblib

# Load dataset
df = pd.read_csv("updated_custom_sip_recommendations.csv")

# Encode categorical features
label_encoders = {}
for col in ['Risk Appetite', 'Investment Goal']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Features and target
features = ['Age', 'Monthly Income (INR)', 'Risk Appetite', 'Time Horizon (Years)', 'Investment Goal']
X = df[features]

# Simulated score for demo purposes (if no actual score column exists)
df['score'] = (
    0.2 * df['Age'] +
    0.3 * df['Monthly Income (INR)'] +
    0.2 * df['Risk Appetite'] +
    0.2 * df['Time Horizon (Years)'] +
    0.1 * df['Investment Goal']
)

y = df['score']

# Train/test split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train LightGBM model
lgb_model = lgb.LGBMRegressor(random_state=42)
lgb_model.fit(X_train, y_train)

# Save model
joblib.dump(lgb_model, 'lightgbm_model.pkl')

# Predict scores
df['Predicted Score'] = lgb_model.predict(X)

# Clustering
scaler = StandardScaler()
scaled_X = scaler.fit_transform(X)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df['Cluster'] = kmeans.fit_predict(scaled_X)

# Save clustering models
joblib.dump(kmeans, 'kmeans_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
df.to_csv('user_clusters_scores.csv', index=False)

print("✅ LightGBM + KMeans models updated and saved successfully.")
