/* ~~~~~~~ IMPORTS from apiCalls ~~~~~~~*/

import { fetchedData, fetchPromises } from './apiCalls';
import './css/normalize.css';
import './css/styles.css';
import './css/normalize.css';
import './images/turing-logo.png';
import './images/road.jpg';
import './images/ocean.jpg';

import {
  getCurrentTraveler,
  getAllTrips,
  getPastTrips,
  getUpcomingTrips,
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
    verifyLogin, } from './domUpdates';

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises).then(() => {
    // console.log(
    //   'CURRENT TRAVELR',
    //   getCurrentTraveler(fetchedData.travelers, 25)
    // );
    console.log('ALL TRIPS', getAllTrips(fetchedData.trips, 25, 'approved'));
    console.log('PAST TRIPS', getPastTrips(fetchedData.trips, 25));
    console.log('UPCOMING TRIPS', getUpcomingTrips(fetchedData.trips, 25));
  });
});
loginForm.addEventListener('submit', verifyLogin);
console.log(loginButton);
