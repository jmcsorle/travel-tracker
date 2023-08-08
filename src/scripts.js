/* ~~~~~~~ IMPORTS from apiCalls ~~~~~~~*/

import { fetchedData, fetchPromises } from './apiCalls';
import './css/normalize.css';
import './css/styles.css';
import './css/normalize.css';
import './images/turing-logo.png';
import './images/road.jpg';
import './images/ocean.jpg';

import {
  getAllTrips,
  getPastTrips,
  getUpcomingTrips,
  getTravelerInputs,
  setTripData,
  getEstimatedLodgingCosts,
  getTotalEstimatedTripCosts,
} from './dataModel';

import {
  loginButton,
  loginForm,
  loginPage,
  loginUserNameField,
  loginPasswordField,
  loginError,
  dashboardPage,
  welcomeSection,
  welcomeUserName,
  tripsUpcoming,
  tripsPast,
  annualCost,
  chooseDestinationField,
  numTravelersField,
  calendarField,
  numDaysField,
  estimatedCostValue,
  tripSubmitButton,
  verifyLogin,
  setListOfDestinations,
  createNewTrip,
//   setListOfYears,
  displayAnnualSpend,
  chooseYear
} from './domUpdates';

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises).then(() => {
    setListOfDestinations();
  });
});

chooseYear.addEventListener('change', () => {
    displayAnnualSpend()
})

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
//   }
}
});
// });

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
    .catch((error) => console.log(`Error at ${error}`));
  e.target.reset();
  estimatedCostValue.innerText = '';
});
