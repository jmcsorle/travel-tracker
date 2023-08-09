import {
  setTravelerData,
  getAnnualTripCosts,
  travelerData,
  getPastTrips,
  getUpcomingTrips,
  getTravelerInputs,
} from './dataModel';

import { fetchedData } from './apiCalls';

/* ~~~~~~~~~~ Query Selectors  ~~~~~~~~~~*/
const loginPage = document.querySelector('.login-screen');
const loginForm = document.querySelector('.login-form');
const loginUserNameField = document.querySelector('.username-field');
const loginPasswordField = document.querySelector('.password-field');
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
const congratsMessage = document.querySelector('.congratulations');

/* ~~~~~~~ DOM Manipulation Functions ~~~~~~~*/

const verifyLogin = (e) => {
  e.preventDefault();
  const userID = +loginUserNameField.value.match(/\d+$/);
  const string = loginUserNameField.value.slice(0, 8);
  if (
    string === 'traveler' &&
    Number(userID) > 0 &&
    Number(userID) <= 50 &&
    loginPasswordField.value === 'travel'
  ) {
    setTravelerData(fetchedData.travelers, userID);
    displayTravelerWelcome();
    displayUpcomingTrips();
    displayPastTrips();
    setCalendarToCurrent();
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

const displayTravelerWelcome = () => {
  if (travelerData.id) {
    welcomeSection.classList.remove('hidden');
    welcomeUserName.innerText = `${travelerData.name}`;
  }
};

const displayCongratuationsMessage = () => {
  congratsMessage.innerHTML = `
    <p>Congratulations on booking your trip! You will soon be on your way!</p>
    <p>A travel agent will contact you within 24 hours.</p>`;
};

const setCalendarToCurrent = () => {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${(
    '0' +
    (today.getMonth() + 1)
  ).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  calendarField.setAttribute('min', todayString);
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
    const destination = fetchedData.destinations.find(
      (destination) => destination.id === trip.destinationID
    );
    const tripHTML = `
    <div class="destination-text">
        <h3 class="destination-heading">${destination.destination}</h3>
    <div class="destination-image">
        <img src="${destination.image}" 
        width="60%" height="60%" alt="${destination.alt}">
    </div>
    </div>
    `;
    return acc + tripHTML;
  }, '');
  tripsPast.innerHTML += tripsHTML;
};

const displayUpcomingTrips = () => {
  const upcomingTrips = getUpcomingTrips(fetchedData.trips, travelerData.id);
  const tripsHTML = upcomingTrips.reduce((acc, trip) => {
    const destination = fetchedData.destinations.find(
      (destination) => destination.id === trip.destinationID
    );
    const tripHTML = `
      <div class="destination-text">
          <h3 class="destination-heading">${destination.destination}</h3>
      <div class="destination-image">
          <img src="${destination.image}" 
          width="60%" height="60%" alt="${destination.alt}">
      </div>
      </div>
      `;
    return acc + tripHTML;
  }, '');
  tripsUpcoming.innerHTML += tripsHTML;
};

const updateUpcomingTrips = () => {
  const currentTrip = getTravelerInputs();
  const destination = fetchedData.destinations.find(
    (destination) => destination.id === currentTrip.destinationID
  );
  const tripHTML = `
        <div class="destination-text">
            <h3 class="destination-heading">${destination.destination}</h3>
        <div class="destination-image">
            <img src="${destination.image}" 
            width="60%" height="60%" alt="${destination.alt}">
        </div>
        </div>
        `;
  tripsUpcoming.innerHTML += tripHTML;
};

export {
  loginPage,
  loginForm,
  loginUserNameField,
  loginPasswordField,
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
  chooseYear,
  verifyLogin,
  setListOfDestinations,
  displayAnnualSpend,
  displayCongratuationsMessage,
  congratsMessage,
  setCalendarToCurrent,
  updateUpcomingTrips,
};
