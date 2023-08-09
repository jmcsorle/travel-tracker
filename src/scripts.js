/* ~~~~~~~ IMPORTS from apiCalls ~~~~~~~*/

import { fetchPromises } from './apiCalls';
import './css/normalize.css';
import './css/styles.css';
import './css/normalize.css';
import './images/turing-logo.png';
import './images/road.jpg';
import './images/ocean.jpg';
import './images/WanderfulLogo_large.png';
import './images/WanderfulLogo_small.png';

import {
  getTravelerInputs,
  setTripData,
  getEstimatedLodgingCosts,
  getTotalEstimatedTripCosts,
} from './dataModel';

import {
  loginForm,
  chooseDestinationField,
  numTravelersField,
  numDaysField,
  estimatedCostValue,
  verifyLogin,
  setListOfDestinations,
  createNewTrip,
  displayAnnualSpend,
  chooseYear,
  displayCongratuationsMessage,
  congratsMessage,
  updateUpcomingTrips,
} from './domUpdates';

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises).then(() => {
    setListOfDestinations();
  });
});

chooseYear.addEventListener('change', () => {
  displayAnnualSpend();
});

createNewTrip.addEventListener('input', () => {
  if (!chooseDestinationField.value) {
    estimatedCostValue.innerText = `Please fill out all fields to get an estimated cost.`;
  } else if (numTravelersField.value && numDaysField.value) {
    const destinationID = parseInt(chooseDestinationField.value);
    const duration = parseInt(numDaysField.value);
    const numTravelers = parseInt(numTravelersField.value);
    const lodgingCosts = getEstimatedLodgingCosts(
      destinationID,
      duration,
      numTravelers
    );
    const totalCost = getTotalEstimatedTripCosts(
      destinationID,
      lodgingCosts,
      numTravelers
    );
    estimatedCostValue.innerText = `Estimated cost for this trip: ${totalCost}`;
  }
});

loginForm.addEventListener('submit', verifyLogin);

createNewTrip.addEventListener('submit', (e) => {
  e.preventDefault();
  const travelerInputs = getTravelerInputs();
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(travelerInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((travelerInputs) => travelerInputs.json())
    .then(() => {
      setTripData();
      updateUpcomingTrips();
      e.target.reset();
      estimatedCostValue.innerText = '';
      congratsMessage.classList.remove('hidden');
      displayCongratuationsMessage();
      setTimeout(() => {
        congratsMessage.classList.add('hidden');
      }, 8000);
    })
    .catch((error) => console.log(`Error at ${error}`));
});
