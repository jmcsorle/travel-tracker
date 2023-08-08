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
  numTravlersField,
  calendarField,
  numDaysField,
  estimatedCostValue,
  tripSubmitButton,
  verifyLogin,
  setListOfDestinations,
  createNewTrip,
} from './domUpdates';

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises).then(() => {
    setListOfDestinations();
    console.log('ALL TRIPS', getAllTrips(fetchedData.trips, 25, 'approved'));
    console.log('PAST TRIPS', getPastTrips(fetchedData.trips, 25));
    console.log('UPCOMING TRIPS', getUpcomingTrips(fetchedData.trips, 25));
  });
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
    .then(console.log(travelerInputs))
    .catch((error) => console.log(`Error at ${error}`));
  e.target.reset();
});
