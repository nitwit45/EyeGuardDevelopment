import os
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from functions import analyseForm, inference, lime, iot

current_directory = os.path.dirname(os.path.abspath(__file__))
functions_directory = os.path.join(current_directory, 'functions')

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define user_answers globally
user_answers = {}
predicted_drugs = {}
predicted_class = ''

@app.route('/upload', methods=['POST'])
def upload_file():
    # Get the image data from the form data
    image_data_base64 = request.form['image']

    # Decode the base64 encoded image data
    image_data_bytes = base64.b64decode(image_data_base64.split(',')[1])  # Remove data URL prefix

    # Open a BytesIO object to work with the decoded image data
    img = Image.open(BytesIO(image_data_bytes))

    # Save the image to the uploads folder
    img_path = os.path.join(UPLOAD_FOLDER, 'uploaded_image.jpg')
    img.save(img_path)

    # Populate user_answers
    global user_answers
    user_answers = {
        "sweating_excessive": request.form.get('sweating_excessive', 'No'),
        "heightened_emotions": request.form.get('heightened_emotions', 'No'),
        "erratic_behavior": request.form.get('erratic_behavior', 'No'),
        "impaired_coordination": request.form.get('impaired_coordination', 'No'),
        "confusion_disorientation": request.form.get('confusion_disorientation', 'No'),
        "speech_changes": request.form.get('speech_changes', 'No'),
        "talkative_energetic": request.form.get('talkative_energetic', 'No'),
        "anxious_paranoia": request.form.get('anxious_paranoia', 'No')
    }
    global predicted_drugs
    predicted_drugs = analyseForm.predict_drug_classification(user_answers)
    

    global predicted_class
    predicted_class = inference.perform_inference(img_path)
    lime.lime_explanation_with_prediction(img_path)
    print("Predicted class:", predicted_class)
    
    # Read lime explanation image
    lime_img_path = 'lime_explanation.png'
    with open(lime_img_path, 'rb') as f:
        lime_image_bytes = f.read()

    # Convert lime image to base64
    lime_image_base64 = base64.b64encode(lime_image_bytes).decode('utf-8')

    # Conditionally set predicted drugs based on predicted class
    if predicted_class == 'Sober':
        predicted_drugs = {"No drugs predicted"}

    # Return predicted class, predicted drugs, and lime image as JSON response
    return jsonify({
        'predicted_class': predicted_class,
        'predicted_drugs': list(predicted_drugs),  # Convert set to list for JSON serialization
        'result_image': lime_image_base64
    }), 200
    
    
# Add this route to handle the heartbeat recording request
@app.route('/record-heartbeat', methods=['POST'])
def record_heartbeat():
    bluetooth_port = "/dev/rfcomm0" 
    average_heart_rate = iot.calculate_average_heart_rate(bluetooth_port)
    
    # Return the average heart rate as a response
    return jsonify({'averageHeartRate': average_heart_rate}), 200

if __name__ == '__main__':
    app.run(debug=True)