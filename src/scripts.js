/* ~~~~~~~ IMPORTS from apiCalls ~~~~~~~*/

import { fetchedData, fetchPromises } from './apiCalls';
import './css/styles.css';
import './css/normalize.css';
import './images/turing-logo.png';

import { getCurrentTraveler, getAllTrips } from './dataModel'

/* ~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~*/
window.addEventListener('load', () => {
  Promise.all(fetchPromises)
  .then(() => {
    getCurrentTraveler(fetchedData.travelers, 25)
  });
});

