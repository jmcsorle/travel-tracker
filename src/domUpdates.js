import {
  setTravelerData,
  getTravelerData,
  getAnnualTripCosts,
  travelerData,
  getPastTrips,
  getUpcomingTrips
} from './dataModel';
import { fetchedData } from './apiCalls';

/* ~~~~~~~~~~ Query Selectors  ~~~~~~~~~~*/
const loginPage = document.querySelector('.login-screen');
const loginForm = document.querySelector('.login-form');
const loginUserNameField = document.querySelector('.username-field');
const loginPasswordField = document.querySelector('.password-field');
const loginButton = document.querySelector('.login-submit-button');
const loginError = document.querySelector('.login-error');
const welcomeSection = document.querySelector('.welcome');
const welcomeUserName = document.querySelector('.welcome-user');
const dashboardPage = document.querySelector('.dashboard');
const createNewTrip = document.querySelector('#createTripForm');
const tripsUpcoming = document.querySelector('.upcoming-trips');
const tripsPast = document.querySelector('.past-trips');
const annualCost = document.querySelector('.annual-cost');
const amountSpent = document.querySelector('.amount-spent');
const chooseYear = document.querySelector('.choose-year-dropdown');
const chooseDestinationField = document.querySelector('#destination');
const numTravelersField = document.querySelector('#numTravelers');
const calendarField = document.querySelector('#calendar');
const numDaysField = document.querySelector('#numDays');
const estimatedCostValue = document.querySelector('#estimatedCost');
const tripSubmitButton = document.querySelector('.trip-submit-button');

/* ~~~~~~~ DOM Manipulation Functions ~~~~~~~*/

const verifyLogin = (e) => {
  e.preventDefault();
  const userID = +loginUserNameField.value.match(/\d+/g);
  const string = loginUserNameField.value.slice(0, 8);
  if (
    string === 'traveler' &&
    Number(userID) > 0 &&
    Number(userID) <= 50 &&
    loginPasswordField.value === 'travel'
  ) {
    setTravelerData(fetchedData.travelers, userID);
    displayUpcomingTrips();
    displayPastTrips();
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
  } else {
    loginError.classList.remove('hidden');
    setTimeout(() => {
      loginError.classList.add('hidden');
    }, 3000);
  }
};

const setListOfDestinations = () => {
  return fetchedData.destinations.forEach((destination) => {
    chooseDestinationField.innerHTML += `
        <option value="${destination.id}">
        ${destination.destination}
        </option>
        `;
  });
};

const displayAnnualSpend = () => {
  const year = chooseYear.value;
  const userID = travelerData.id;
  const annualSpend = getAnnualTripCosts(userID, year);
  if (year) {
    amountSpent.classList.remove('hidden');
    return (amountSpent.innerText = `You spent $${annualSpend} in ${year}.`);
  } else {
    amountSpent.classList.add('hidden');
  }
};

const displayPastTrips = () => {
  const pastTrips = getPastTrips(fetchedData.trips, travelerData.id);
  const tripsHTML = pastTrips.reduce((acc, trip) => {
    const destination = fetchedData.destinations.find(destination => destination.id === trip.destinationID);
    const tripHTML = `
    <div class="destination-text">
        <h3 class="destination-heading">${destination.destination}</h3>
    <div class="destination-image">
        <img src="${destination.image}" width="50%" height="50%" alt="${destination.alt}">
    </div>
    </div>
    `;
    return acc + tripHTML
  }, '');
  tripsPast.innerHTML += tripsHTML
};

const displayUpcomingTrips = () => {
    const upcomingTrips = getUpcomingTrips(fetchedData.trips, travelerData.id);
    const tripsHTML = upcomingTrips.reduce((acc, trip) => {
      const destination = fetchedData.destinations.find(destination => destination.id === trip.destinationID);
      const tripHTML = `
      <div class="destination-text">
          <h3 class="destination-heading">${destination.destination}</h3>
      <div class="destination-image">
          <img src="${destination.image}" width="50%" height="50%" alt="${destination.alt}">
      </div>
      </div>
      `;
      return acc + tripHTML
    }, '');
    tripsUpcoming.innerHTML += tripsHTML
};

export {
  loginPage,
  loginForm,
  loginUserNameField,
  loginPasswordField,
  loginButton,
  loginError,
  dashboardPage,
  welcomeSection,
  welcomeUserName,
  tripsUpcoming,
  tripsPast,
  annualCost,
  createNewTrip,
  chooseDestinationField,
  numTravelersField,
  calendarField,
  numDaysField,
  estimatedCostValue,
  tripSubmitButton,
  chooseYear,
  verifyLogin,
  setListOfDestinations,
  //   setListOfYears,
  displayAnnualSpend,
};
