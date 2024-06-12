import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Form.css";

const Form = ({ formData, onChange }) => {

    const handleQuestionChange = (question, value) => {
        onChange(question, value);
    }

    return (
        <div className="form-container">
            <FormControl>
                {/* Additional Questions */}
                <FormLabel className="form-label">1. Is the suspect sweating excessively or experiencing changes in body temperature?</FormLabel>
                <RadioGroup
                    row
                    name="sweating_excessive"
                    value={formData.sweating_excessive}
                    onChange={(e) => handleQuestionChange('sweating_excessive', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">2. Is the suspect exhibiting heightened or exaggerated emotions?</FormLabel>
                <RadioGroup
                    row
                    name="heightened_emotions"
                    value={formData.heightened_emotions}
                    onChange={(e) => handleQuestionChange('heightened_emotions', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">3. Does the suspect display erratic or aggressive behavior?</FormLabel>
                <RadioGroup
                    row
                    name="erratic_behavior"
                    value={formData.erratic_behavior}
                    onChange={(e) => handleQuestionChange('erratic_behavior', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">4. Is there evidence of impaired coordination or motor skills?</FormLabel>
                <RadioGroup
                    row
                    name="impaired_coordination"
                    value={formData.impaired_coordination}
                    onChange={(e) => handleQuestionChange('impaired_coordination', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">5. Does the suspect exhibit signs of confusion, disorientation, or memory lapses?</FormLabel>
                <RadioGroup
                    row
                    name="confusion_disorientation"
                    value={formData.confusion_disorientation}
                    onChange={(e) => handleQuestionChange('confusion_disorientation', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">6. Are there noticeable changes in the suspect's speech patterns or coherence?</FormLabel>
                <RadioGroup
                    row
                    name="speech_changes"
                    value={formData.speech_changes}
                    onChange={(e) => handleQuestionChange('speech_changes', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">7. Is the suspect overly talkative or excessively energetic?</FormLabel>
                <RadioGroup
                    row
                    name="talkative_energetic"
                    value={formData.talkative_energetic}
                    onChange={(e) => handleQuestionChange('talkative_energetic', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel className="form-label">8. Does the suspect appear anxious, paranoid, or agitated?</FormLabel>
                <RadioGroup
                    row
                    name="anxious_paranoia"
                    value={formData.anxious_paranoia}
                    onChange={(e) => handleQuestionChange('anxious_paranoia', e.target.value)}
                >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default Form;
