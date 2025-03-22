# # flask.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import re
# import os

# app = Flask(__name__)
# CORS(app)

# # Load the model (Do this ONCE when the application starts)
# MODEL_PATH = 'C:\Users\adity\OneDrive\Desktop\Hackathon\Code-a-Manipal\docease-connect-main\docease-connect-main\src\pages\model.py'

# if not os.path.exists(MODEL_PATH):
#     print(f"Error: Model file not found at {MODEL_PATH}.  Make sure you run model.py first!")
#     exit()  # Or handle the error more gracefully

# model = joblib.load(MODEL_PATH)


# def clean_text(text):
#     text = re.sub(r'[^a-zA-Z\s]', '', str(text), re.I | re.A)
#     text = text.lower()
#     return text


# @app.route('/analyze', methods=['POST'])
# def analyze_report():
#     try:
#         data = request.get_json()
#         report_text = data.get('reportText')

#         if not report_text:
#             return jsonify({'error': 'reportText is required'}), 400

#         # Preprocess the report text
#         cleaned_text = clean_text(report_text)

#         # Make a prediction using the loaded model
#         prediction = model.predict([cleaned_text])[0]  # model expects a list of strings

#         # Format the results
#         analysis_result = {
#             'predicted_condition': prediction,
#             'summary': f'The predicted medical condition is: {prediction}',  # Enhance the summary
#             'recommendations': ['Consult with a doctor for further evaluation.']  # Add recommendations
#         }

#         return jsonify({'result': analysis_result})

#     except Exception as e:
#         print(f"Error during analysis: {e}")
#         return jsonify({'error': str(e)}, 500)


# if __name__ == '__main__':
#     app.run(debug=True)


#newcode
print("Flask is starting...")






from flask import Flask, request, jsonify

from flask_cors import CORS
import os
import pytesseract
from pdf2image import convert_from_path
# from pages.ReportAnalysis.frontend.backend.api import analyze_with_groq
from api import analyze_with_groq

from model import analyze_with_deepseek

from dotenv import load_dotenv
pytesseract.pytesseract.tesseract_cmd = os.getenv("TESSERACT_PATH")
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"


load_dotenv()

app = Flask(__name__)
CORS(app)

# Set Tesseract path for Windows (Update this based on installation)
pytesseract.pytesseract.tesseract_cmd = r"C:/Users/adity/anaconda3/Lib/site-packages"

def extract_text(file_path):
    """Extract text from image or PDF"""
    try:
        if file_path.endswith(".pdf"):
            images = convert_from_path(file_path)
            text = " ".join([pytesseract.image_to_string(img) for img in images])
        else:
            text = pytesseract.image_to_string(file_path)
        return text.strip()
    except Exception as e:
        return str(e)

@app.route('/analyze', methods=['POST'])
def analyze_report():
    """Analyze a single medical report"""
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    extracted_text = extract_text(file_path)
    groq_result = analyze_with_groq(extracted_text)
    deepseek_result = analyze_with_deepseek(extracted_text)

    response = {
        "file_name": file.filename,
        "extracted_text": extracted_text,
        "groq_analysis": groq_result,
        "deepseek_analysis": deepseek_result
    }
    
    os.remove(file_path)
    return jsonify(response)

@app.route('/compare', methods=['POST'])
def compare_reports():
    """Compare multiple reports for progress tracking"""
    files = request.files.getlist('files')
    if not files or len(files) < 2:
        return jsonify({"error": "At least two reports required"}), 400

    analysis_results = []
    for file in files:
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        extracted_text = extract_text(file_path)
        groq_result = analyze_with_groq(extracted_text)
        deepseek_result = analyze_with_deepseek(extracted_text)

        analysis_results.append({
            "file_name": file.filename,
            "extracted_text": extracted_text,
            "groq_analysis": groq_result,
            "deepseek_analysis": deepseek_result
        })
        
        os.remove(file_path)

    return jsonify({"progress_analysis": analysis_results})

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
