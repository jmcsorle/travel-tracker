/* ~~~~~~~ IMPORTS from apiCalls ~~~~~~~*/

import { fetchApiData, fetchPromises } from './apiCalls';
import './css/styles.css';
import './css/normalize.css';
import './images/turing-logo.png';

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises)
  .then((dataSet) => {

  });
});

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/
const getAllTravelers = () => {

}

const getCurrentTraveler = () => {

}

const getAllTrips = (travelerID) => {
//needs to show all trips for a specific traveler (past, upcoming, and pending)
}

const getAllDestinations = () => {

}

const getTotalAnnualSpend = () => {
    // Total amount I have spent on trips this year. This should be calculated from the trips data and include a travel agent’s 10% fee
}
