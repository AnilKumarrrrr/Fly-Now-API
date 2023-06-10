const express = require('express');
const fetch = require('isomorphic-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/flight-prices', async (req, res) => {
  const { source, destination, date } = req.body;

  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f2ff72c389msh0ef4a6a0210672cp1cababjsnad63de081a0e',
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
      },
    };

    const response = await fetch(`https://skyscanner50.p.rapidapi.com/api/v1/searchFlights?origin=${source}&destination=${destination}&date=${date}&adults=1&currency=USD&countryCode=US&market=en-US`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch flight prices');
    }

    const data = await response.json();

    console.log(data); // Log the data object to inspect its structure
    const flights = data.data.map((flight) => ({
      airline: flight.id,
      price: flight.price.amount,
    }));

    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch flight prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
