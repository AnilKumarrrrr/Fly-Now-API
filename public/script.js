document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const sourceInput = document.getElementById('sourceInput');
  const destinationInput = document.getElementById('destinationInput');
  const dateInput = document.getElementById('dateInput');
  const flightResults = document.getElementById('flightResults');

  searchButton.addEventListener('click', () => {
    searchFlights();
  });

  const searchFlights = async () => {
    const source = sourceInput.value.trim();
    const destination = destinationInput.value.trim();
    const date = dateInput.value;

    if (!source || !destination || !date) {
      alert('Please enter source, destination, and date');
      return;
    }

    try {
      const response = await fetch('/flight-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source, destination, date })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flight prices');
      }

      const flights = await response.json();

      // Display flight details
      let html = '';
      flights.forEach((flight) => {
        html += `<p>Airline: ${flight.airline}</p>`;
        html += `<p>Price: ${flight.price}</p>`;
        html += '<hr>';
      });

      flightResults.innerHTML = html;
    } catch (error) {
      console.error(error);
      flightResults.innerHTML = '<p>Error fetching flight prices</p>';
    }
  };
});
