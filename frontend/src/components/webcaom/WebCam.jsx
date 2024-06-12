import React, { useEffect, useRef, useState } from "react";
import WebcamReact from "react-webcam";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WebCam.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted for responsiveness
  maxWidth: 800, // Maximum width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Webcam = (props) => {
  const [label, setLabel] = useState("Take Picture");
  const [uploadImg, setUploadImg] = useState(false);
  const [isImageTake, setIsImageTake] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
    setIsImageTake(true);
    setIsOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imageSrc = reader.result;
      setImageData(imageSrc);
      setIsImageTake(true);
      setIsOpen(true);
    };
  
    reader.readAsDataURL(selectedFile);
  };

  const handleRetake = () => {
    setIsOpen(false);
    setIsImageTake(false);
  };

  const handleSave = () => {
    setIsOpen(false);
    props.onImageCapture(imageData);
  };

  const handleToggle = () => {
    setLabel(label === "Take Picture" ? "Upload Photo" : "Take Picture");
    setUploadImg(!uploadImg);
  };

  return (
    <div className="main-photo-container">
      <div className="photo-container">
        {!uploadImg && !isImageTake && (
          <div>
            <WebcamReact
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam" // Add className for styling
            />
            {!isImageTake && (
              <Button
                variant="contained"
                className="photo-take-button"
                onClick={handleCapture}
              >
                Take Image
              </Button>
            )}
          </div>
        )}
        {uploadImg && !isImageTake && (
          <div>
            <input type="file" onChange={handleFileChange} />
            <Button
              variant="contained"
              className="photo-take-button"
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          </div>
        )}
        {isImageTake && (
          <img src={imageData} alt="Captured image" className="captured-image" />
        )}
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Captured Image
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img src={imageData} alt="Captured image" className="captured-image-modal" />
            </Typography>
            <Button onClick={handleSave}>Use Image</Button>
            <Button onClick={handleRetake}>Retake Image</Button>
          </Box>
        </Modal>
      </div>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={label}
        onChange={handleToggle}
      />
    </div>
  );
  
};

export default Webcam;
