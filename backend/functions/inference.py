import torch
from torchvision.models import VisionTransformer
from torchvision import transforms
from PIL import Image
import matplotlib.pyplot as plt
from functions.going_modular.going_modular.predictions import pred_and_plot_image

model_save_path = "functions/pretrained_vit_model.pth"
image_path = "/home/nitwit/Pictures/TestFYP/High/notred2.jpg"
class_names = ['DrugTaken', 'Sober']

def perform_inference(image_path, model_save_path=model_save_path, class_names=class_names):
    # Load the model
    loaded_model = torch.load(model_save_path, map_location=torch.device('cpu'))

    # Ensure the model is in evaluation mode
    loaded_model.eval()

    # Define the transformations needed for your input image
    image_transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize the image to fit the model's input size
        transforms.ToTensor(),  # Convert image to tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize the image
    ])

    # Load and preprocess the image
    image = Image.open(image_path)
    input_image = image_transform(image).unsqueeze(0)  # Add batch dimension

    # Pass the image through the loaded model for inference
    predicted_class = pred_and_plot_image(model=loaded_model,
                                          class_names=class_names,
                                          image_path=image_path)

    return predicted_class
    # Load the model
    loaded_model = torch.load(model_save_path, map_location=torch.device('cpu'))

    # Ensure the model is in evaluation mode
    loaded_model.eval()

    # Define the transformations needed for your input image
    image_transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize the image to fit the model's input size
        transforms.ToTensor(),  # Convert image to tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize the image
    ])

    # Load and preprocess the image
    image = Image.open(image_path)
    input_image = image_transform(image).unsqueeze(0)  # Add batch dimension

    # Pass the image through the loaded model for inference
    predicted_class = pred_and_plot_image(model=loaded_model,
                                          class_names=class_names,
                                          image_path=image_path)

    return predicted_class

# Example usage:


# predicted_class = perform_inference(model_save_path, image_path, class_names)
# print("Predicted class:", predicted_class)
