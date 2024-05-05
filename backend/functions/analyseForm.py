import pandas as pd
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Load the data from CSV
df = pd.read_csv("/home/nitwit/Campus/FYP/EyeGuard/FinalCode/backend/functions/preprocessed_data.csv")

# Define fuzzy variables and membership functions
question = ctrl.Antecedent(np.arange(0, 11, 1), 'question')
answer = ctrl.Antecedent(np.arange(0, 2, 1), 'answer')
drug_classification = ctrl.Consequent(np.arange(0, 11, 1), 'drug_classification')

# Generate membership functions
question['low'] = fuzz.trimf(question.universe, [0, 0, 5])
question['medium'] = fuzz.trimf(question.universe, [0, 5, 10])
question['high'] = fuzz.trimf(question.universe, [5, 10, 10])

answer['no'] = fuzz.trimf(answer.universe, [0, 0, 1])
answer['yes'] = fuzz.trimf(answer.universe, [0, 1, 1])

drug_classification['none'] = fuzz.trimf(drug_classification.universe, [0, 0, 5])
drug_classification['low'] = fuzz.trimf(drug_classification.universe, [0, 5, 10])
drug_classification['high'] = fuzz.trimf(drug_classification.universe, [5, 10, 10])

# Define rules
rule1 = ctrl.Rule(question['low'] & answer['no'], drug_classification['none'])
rule2 = ctrl.Rule(question['low'] & answer['yes'], drug_classification['low'])
rule3 = ctrl.Rule(question['medium'] & answer['no'], drug_classification['low'])
rule4 = ctrl.Rule(question['medium'] & answer['yes'], drug_classification['high'])
rule5 = ctrl.Rule(question['high'] & answer['no'], drug_classification['high'])
rule6 = ctrl.Rule(question['high'] & answer['yes'], drug_classification['high'])

# Create control system
drug_classification_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6])
drug_classification_prediction = ctrl.ControlSystemSimulation(drug_classification_ctrl)

# Function to predict drug classification
def predict_drug_classification(answers):
    predicted_drugs = set()
    for index, row in df.iterrows():
        drug_classification_prediction.input['question'] = df.loc[index, 'Question'] == answers.get(df.loc[index, 'Question'])
        drug_classification_prediction.input['answer'] = answers.get(df.loc[index, 'Question']) == "Yes"
        drug_classification_prediction.compute()
        if drug_classification_prediction.output['drug_classification'] > 5:
            predicted_drugs.add(df.loc[index, 'Drug Classification'])

    if not predicted_drugs:
        predicted_drugs.add("No drugs predicted")
        
    return predicted_drugs

# Example usage
# user_answers = {
#     "sweating_excessive": "No",
#     "heightened_emotions": "No",
#     "erratic_behavior": "No",
#     "impaired_coordination": "No",
#     "confusion_disorientation": "No",
#     "speech_changes": "No",
#     "talkative_energetic": "Yes",
#     "anxious_paranoia": "Yes"
# }

# predicted_drugs = predict_drug_classification(user_answers)
# print("Predicted drug classifications:", predicted_drugs)
