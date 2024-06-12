import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const { state } = location;
  const { predictedClass, predictedDrugs, resultImage, name, age, sex, heartRate } = state;

  // Array of objects representing properties of each card
  const cards = [
    { image: 'https://www.irishexaminer.com/cms_media/module_img/82/41306_1_seoimage4x3_bn-986023_c4ad1998d67a4aebbe4ddbc79766cd71.jpg', title: 'Cocain/Crack', description: "Cocaine and crack cocaine are potent stimulants that can drastically increase heart rate, often ranging from 100 to 180 beats per minute. Users experience heightened alertness, euphoria, and increased energy, along with dilated pupils, elevated body temperature, and suppressed appetite. Chronic use can lead to addiction, cardiovascular problems, and severe psychological issues."},
    { image: 'https://cdn.pixabay.com/photo/2015/11/25/20/43/seedling-1062908_640.jpg', title: 'Marijuana', description: 'Marijuana induces relaxation and mild euphoria, with a slight increase in heart rate (20-50 bpm). Users may experience bloodshot eyes, dry mouth, and increased appetite. Its active compound, THC, alters perception and mood. Chronic use may lead to dependency and cognitive impairments, with lower cardiovascular risks compared to stimulants.' },
    { image: 'https://www.ridgefieldrecovery.com/wp-content/uploads/2023/04/Benzodiazepine-Addiction-rvr.com_.jpg-1024x512.webp', title: 'Benzodiazepines', description: 'Benzodiazepines, prescribed for anxiety and sleep disorders, promote relaxation and sedation by enhancing GABA in the brain. They typically lower heart rate and blood pressure, inducing calmness. Side effects may include drowsiness, dizziness, and impaired coordination. Chronic use can lead to dependency and overdose risks, particularly when combined with alcohol or other depressants.' },
    { image: 'https://www.beachesrecovery.com/wp-content/uploads/2019/02/Prescription-Stimulants-vs-Depressants.jpg', title: 'Depressants', description: 'Depressants, such as alcohol and opioids, slow down the central nervous system, reducing heart rate and blood pressure. They induce relaxation and drowsiness, impairing coordination. Long-term use can lead to dependency and overdose, especially with opioids, which can cause respiratory depression. Mixing depressants with alcohol heightens the risk of overdose and adverse effects.' },

  ];

  return (
    <div className='maindiv'>
      <Paper elevation={3} className='report-glassmorphism'>
        <Typography variant='h4'>Results</Typography>
        <div className='info'>
          <Typography variant='subtitle1'>Name: John Doe {name}</Typography>
          <Typography variant='subtitle1'>Age: 25{age}</Typography>
          <Typography variant='subtitle1'>Sex: Male{sex}</Typography>
          <Typography variant='subtitle1'>Prediction: {predictedClass}</Typography>
          <Typography variant='subtitle1'>Possible Drugs Used:</Typography>
          <List>
            {predictedDrugs && predictedDrugs.map((drug, index) => (
              <ListItem key={index}>
                <ListItemText primary={drug} />
              </ListItem>
            ))}
          </List>
          <Typography variant='subtitle1'>Heart Rate: {heartRate} BPM</Typography>
        </div>
      </Paper>
      {resultImage && (
        <img src={`data:image/png;base64,${resultImage}`} alt="Lime Explanation" />
      )}
      <Grid container spacing={2} justifyContent="center" className="card-grid" style={{ marginTop: '20px' }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Result;
