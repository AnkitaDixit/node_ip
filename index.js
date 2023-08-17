const express = require('express');
const cors = require('cors')
const axios = require('axios');

const app = express();
const port = 3001; // Choose a port

const apiKey = 'AIzaSyB6UduF6FxK9AFsNoOtqkNHGPPvBMzEKdI'; // Replace with your API key
app.use(cors());
app.use(express.json());

app.post('/searchLocality', async (req, res) => {
  const { input } = req.body;
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: input,
        components: 'country:IN', // Restrict to India
        types: 'locality', // Restricted to places
        key: apiKey,
    
      }
    });

    const predictions = response.data.predictions;
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'An error occurred while fetching places.' });
  }
});

app.post('/searchLodging', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: input,
        components: 'country:IN', // Restrict to India
        types: 'lodging', //Restricted to lodging
        key: apiKey,
    
      }
    });

    const predictions = response.data.predictions;
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'An error occurred while fetching places.' });
  }
});

app.get('/placeDetails', async (req, res) => {
  try {
    const placeid = req.url.substr(14);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ error: 'An error occurred while fetching place details.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});