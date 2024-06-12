import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/eyeguard.png";
import User from "../../assets/user.png";
import Cookies from "js-cookie";
import "./Dashboard.css";
import WebCam from "../../components/webcaom/WebCam";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Form from "../../components/form/Form";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const storedUsername = Cookies.get("username");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storedValue = localStorage.getItem('isCompleted')
  const [capturedImg, setCapturedImg] = useState(null);
  const [heartbeat, setHeartbeat] = useState(""); // State to store heartbeat value
  const [formData, setFormData] = useState({
    sweating: '',
    behavior:'',
    emotions: '',
    memory:'',
    coordination: '',
    speech: '',
    talkative: '',
    anxious: ''
  });
  const [showWebcam, setShowWebcam] = useState(true);
  const [heartbeatStatus, setHeartbeatStatus] = useState(""); // State to store heartbeat status message

  const handleImageCapture = (imageData) => {
    console.log("Captured Image Data:", imageData);
    setCapturedImg(imageData);
    setShowWebcam(false); // Hide the webcam after capturing image
  };

  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRecordHeartbeat = async () => {
    try {
      // Update heartbeat status to indicate recording
      setHeartbeatStatus("Recording heartbeat...");
      setHeartbeat(null)
      const response = await fetch('http://localhost:5000/record-heartbeat', {
        method: 'POST',
      });
      const data = await response.json();
      if (data && data.averageHeartRate) {
        // Update heartbeat status with received heartbeat
        setHeartbeatStatus("Heartbeat recorded:");
        setHeartbeat(data.averageHeartRate);
      }
    } catch (error) {
      console.error('Error recording heartbeat:', error);
      // Update heartbeat status with error message
      setHeartbeatStatus("Error recording heartbeat");
    }
  };

  // Handle form submission and fetching predictions
  const handleOpen = () => {
    setLoading(true);
    const body = new FormData();
    body.append('image', capturedImg);
    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: body,
    })
    .then(response => {
        if (response.ok) {
            console.log('Image uploaded successfully');
            return response.json(); // Parse response body as JSON
        } else {
            throw new Error('Failed to upload image');
        }
    })
    .then(data => {
      const { predicted_class, predicted_drugs, result_image } = data; // Assuming the response contains predicted_class and predicted_drugs
      console.log("Predicted Class:", predicted_class);
      console.log("Predicted Drugs:", predicted_drugs);
      setLoading(false);
      navigate("/result", {
        state: {
          predictedClass: predicted_class,
          predictedDrugs: predicted_drugs,
          resultImage: result_image,
          heartRate: heartbeat
        }
      });
  })
    .catch(error => {
        console.error('Error uploading image:', error);
        setLoading(false);
    });
};

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#040C18",
  }));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <img src={Logo} alt="Logo" style={{ width: "150px" }} />
        </div>
        <div className="dashboard-header-right">
          <div className="dashboard-details">
            <p className="dashboard-acc-type">Basic Account</p>
            <p className="dashboard-acc-name">{storedUsername} </p>
          </div>
          <img src={User} alt="User" />
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={{ xs: 12, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={6} md={8}>
            <Item>
              <div className="image-container">
                {showWebcam && <WebCam onImageCapture={handleImageCapture} />}
                {capturedImg && !showWebcam && <img src={capturedImg} alt="Captured" className="uploaded-image" />}
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Item>
              <Form formData={formData} onChange={handleFormChange} />
              <Button onClick={handleRecordHeartbeat} variant="contained" style={{ marginTop: "20px" }}>Record Heartbeat</Button>
              <p style={{ marginTop: "10px", fontSize: "20px" }}>{heartbeatStatus} {heartbeat && `${heartbeat} BPM`}</p>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <div className="submit-button">
        <Button onClick={handleOpen} disabled={loading} variant="contained" style={{position: 'relative'}}>
          {loading && <CircularProgress size={30} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />}
          Submit for Results
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
