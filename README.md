# Drug Usage Prediction System

This project utilizes Vision Transformers and Fuzzy Logic to predict whether an individual has taken drugs based on image analysis and questionnaire responses. The system combines advanced machine learning techniques with a user-friendly web interface for efficient and accurate predictions.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This system combines Vision Transformers with fuzzy logic to analyze images and questionnaire responses to determine if an individual has taken any drugs. The project includes both backend and frontend components, with functionalities to upload images, process data, and provide detailed explanations using LIME for interpretability.

## Features
- Image upload and preprocessing
- Vision Transformer-based inference
- Fuzzy logic-based questionnaire analysis
- LIME for interpretability of predictions
- Heart rate monitoring via IoT integration

## Technologies Used
- **Backend:** Python, Flask, TensorFlow, PyTorch, LIME, scikit-fuzzy
- **Frontend:** React, HTML, CSS
- **Other:** Node.js, Express

## Setup and Installation
### Backend
1. Install Python 3.11.8.
2. Navigate to the backend directory:
    ```bash
    cd backend
    ```
3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

### Frontend
1. Install Node.js.
2. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
3. Install the required Node.js packages:
    ```bash
    npm install --force
    ```

## Running the Project
### Backend
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Start the backend server:
    ```bash
    python main.py
    ```

### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Start the frontend server:
    ```bash
    npm start
    ```


## Usage
1. **Upload an Image:** Upload an image through the frontend interface.
2. **Fill out the Questionnaire:** Complete the questionnaire based on observed behaviors.
3. **Receive Predictions:** The system will analyze the image and responses to predict drug usage.
4. **View Explanations:** Detailed explanations of the predictions using LIME.
5. **Monitor Heart Rate:** Record heart rate data using IoT integration (optional).

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure your code follows the project's style guidelines and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Example Images

Include images of your application interface here for a better visual understanding. 

![Upload Interface](https://ibb.co/Sv1R875)
*Image: Landing Page*

![Prediction Results](https://path_to_your_image/prediction_results.png)
*Image: Prediction Results*

---

## Contact
For any inquiries, please contact nithila7777@gmail.com

