# # import kagglehub
# # import pandas as pd
# # import re
# # from sklearn.model_selection import train_test_split
# # from sklearn.feature_extraction.text import TfidfVectorizer
# # from sklearn.naive_bayes import MultinomialNB
# # from sklearn.pipeline import Pipeline
# # from sklearn.metrics import classification_report
# # import joblib

# # # 1. Download and Load the Dataset
# # path = kagglehub.dataset_download("prasad22/healthcare-dataset")
# # print("Path to dataset files:", path)

# # # Assuming your dataset is in a CSV file
# # try:
# #     df = pd.read_csv(f"{path}/healthcare_dataset.csv")  # Adjust path if needed
# # except FileNotFoundError:
# #     print("Error: healthcare_dataset.csv not found in the downloaded dataset.")
# #     exit()


# # # 2. Data Preprocessing
# # # Handle missing values (replace with empty string for text)
# # df.fillna('', inplace=True)

# # # Combine relevant columns into a single text feature
# # df['text'] = df['Name'] + ' ' + df['Gender'] + ' ' + df['Blood Type'] + ' ' + df['Medical Condition'] + ' ' + df['Medication']

# # # Clean the text (remove special characters, lowercase)
# # def clean_text(text):
# #     text = re.sub(r'[^a-zA-Z\s]', '', str(text), re.I|re.A)
# #     text = text.lower()
# #     return text

# # df['text'] = df['text'].apply(clean_text)

# # # Define the target variable (what you want to predict)
# # # This depends on your dataset and goals.  For example, predict 'Medical Condition'
# # TARGET = 'Medical Condition'

# # # 3. Split Data
# # X = df['text']
# # y = df[TARGET]
# # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # # 4. Model Training (Example: Naive Bayes)
# # # Create a pipeline with TF-IDF vectorizer and Naive Bayes classifier
# # model = Pipeline([
# #     ('tfidf', TfidfVectorizer()),
# #     ('classifier', MultinomialNB())
# # ])

# # # Train the model
# # model.fit(X_train, y_train)

# # # 5. Evaluate the Model
# # y_pred = model.predict(X_test)
# # print(classification_report(y_test, y_pred))


# # # 6. Save the Model
# # joblib.dump(model, 'medical_report_model.joblib')
# # print("Model saved as medical_report_model.joblib")


# #new

# # model.py
# import kagglehub
# import pandas as pd
# import re
# from sklearn.model_selection import train_test_split
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.pipeline import Pipeline
# from sklearn.metrics import classification_report
# import joblib

# def train_and_save_model():
#     # 1. Download and Load the Dataset
#     path = kagglehub.dataset_download("prasad22/healthcare-dataset")
#     print("Path to dataset files:", path)

#     # Assuming your dataset is in a CSV file
#     try:
#         df = pd.read_csv(f"{path}/healthcare_dataset.csv")  # Adjust path if needed
#     except FileNotFoundError:
#         print("Error: healthcare_dataset.csv not found in the downloaded dataset.")
#         return False

#     # 2. Data Preprocessing
#     # Handle missing values (replace with empty string for text)
#     df.fillna('', inplace=True)

#     # Combine relevant columns into a single text feature
#     df['text'] = df['Name'] + ' ' + df['Gender'] + ' ' + df['Blood Type'] + ' ' + df['Medical Condition'] + ' ' + df['Medication']

#     # Clean the text (remove special characters, lowercase)
#     def clean_text(text):
#         text = re.sub(r'[^a-zA-Z\s]', '', str(text), re.I|re.A)
#         text = text.lower()
#         return text

#     df['text'] = df['text'].apply(clean_text)

#     # Define the target variable (what you want to predict)
#     # This depends on your dataset and goals.  For example, predict 'Medical Condition'
#     TARGET = 'Medical Condition'

#     # 3. Split Data
#     X = df['text']
#     y = df[TARGET]
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#     # 4. Model Training (Example: Naive Bayes)
#     # Create a pipeline with TF-IDF vectorizer and Naive Bayes classifier
#     model = Pipeline([
#         ('tfidf', TfidfVectorizer()),
#         ('classifier', MultinomialNB())
#     ])

#     # Train the model
#     model.fit(X_train, y_train)

#     # 5. Evaluate the Model
#     y_pred = model.predict(X_test)
#     print(classification_report(y_test, y_pred))

#     # 6. Save the Model
#     joblib.dump(model, 'medical_report_model.joblib')
#     print("Model saved as medical_report_model.joblib")
#     return True # Indicate success

# if __name__ == "__main__":
#     if train_and_save_model():
#         print("Model training and saving complete.")
#     else:
#         print("Model training and saving failed.")


# #run python model.py       











import os
import requests

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
DEEPSEEK_API_URL = "https://api.deepseek.com/analyze"


def analyze_with_deepseek(text):
    print(f"🔍 Sending request to DeepSeek API: {text}")  # Debugging print
    response = requests.post("https://api.deepseek.com/analyze", json={"text": text})
    print(f"🛑 Response Status: {response.status_code}")  # Debugging print
    print(f"🛑 Response Text: {response.text}")
    """Analyze text using DeepSeek API"""
    headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
    data = {"text": text}

    response = requests.post(DEEPSEEK_API_URL, json=data, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to get analysis from DeepSeek API"}
