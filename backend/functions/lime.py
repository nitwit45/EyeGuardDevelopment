import os
import numpy as np
import torch
from PIL import Image
from torchvision import transforms
from lime import lime_image
from skimage.segmentation import mark_boundaries
import matplotlib.pyplot as plt
from functions.going_modular.going_modular.predictions import pred_and_plot_image

def lime_explanation_with_prediction(image_path, saved_model_path="functions/pretrained_vit_model.pth"):
    
    print("Loading XAI Start")
    # Load pretrained ViT model
    pretrained_vit = torch.load(saved_model_path)
    pretrained_vit.eval()

    # Define transformations for preprocessing
    transform = transforms.Compose([
        transforms.Resize((224, 224)),  
        transforms.ToTensor(),          
        transforms.Normalize(            
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    # Load and preprocess the image
    image = Image.open(image_path).convert("RGB")
    image = transform(image)

    # Determine the device (CPU or GPU)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Move the model to the selected device
    pretrained_vit.to(device)

    # Modify the predict function to ensure the output tensor is on CPU
    def predict_fn(images):
        images = torch.tensor(images).to(device)
        images = images.permute(0, 3, 1, 2)
        with torch.no_grad():
            outputs = pretrained_vit(images)
        return outputs.cpu().numpy()

    # Batch processing for Lime explanation
    def batch_predict_fn(images):
        images = torch.tensor(images).to(device)
        images = images.permute(0, 3, 1, 2)
        with torch.no_grad():
            outputs = pretrained_vit(images)
        return outputs.cpu().numpy()

    # Move the image tensor to CPU before passing it to LimeImageExplainer
    image_cpu = image.cpu().detach().numpy()

    # Explain instance
    explainer = lime_image.LimeImageExplainer()

    # Reduce the number of samples for faster computation
    num_samples = 500

    explanation = explainer.explain_instance(image_cpu.transpose(1, 2, 0), predict_fn, top_labels=5, num_samples=num_samples)

    # Get explanation image and mask
    temp, mask = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=True, num_features=5, hide_rest=False)
    image_boundry = mark_boundaries(temp / 2 + 0.5, mask)
    plt.imshow(image_boundry)
    plt.title('Lime Explanation')
    plt.savefig('lime_explanation.png')
    plt.close()

    # Make predictions and plot image
    class_names = ['DrugTaken', 'Sober']
    prediction_plot = pred_and_plot_image(model=pretrained_vit, image_path=image_path, class_names=class_names)
    plt.savefig('prediction_plot.png')
    plt.close()
    print("Loading XAI Done")

    return image_boundry

# Example usage:
# image_path = "red.jpg"
# result_image = lime_explanation_with_prediction(image_path)
# result_image.save("result_image.png")
