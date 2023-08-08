import {
  setTravelerData,
  getTravelerData,
  getAnnualTripCosts,
  travelerData,
  getPastTrips
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
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
    getPastTrips(fetchedData.trips, travelerData.id)
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
  console.log("YEAR", year)
  const userID = travelerData.id;
  console.log("TRAVELER ID", travelerData.id)
  const annualSpend = getAnnualTripCosts(userID, year);
  if (year) {
    amountSpent.classList.remove('hidden');
    return (amountSpent.innerText = `You spent $${annualSpend} in ${year}.`);
  } else {
    amountSpent.classList.add('hidden');
  }
};

const displayPendingTrips = () => {};

//   const getDOMUpdates = () {

//   }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// const initializeApp = () => {
//     currentUser = getRandomUser(users);
//     sleepCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);
//     activityCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);
//     currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);
//     displayRandomUser(activity, currentUser);
//     displayFluidConsumedToday(hydration, currentUser, currentDate);
//     displayDailySleep(sleep, currentUser, sleepCurrentDate);
//     displayAverageSleep(sleep, currentUser, sleepCurrentDate);
//     displayActivity(activity, currentUser, activityCurrentDate);
//     stepsPerDay(activity, currentUser, currentDate);
//     activeMinutesPerDay(activity, currentUser, activityCurrentDate);
//     displayWeeklyStepCount(activity, currentUser, activityCurrentDate);
//     displayRandomQuote();
//     setMotivationLevel('level');

//     const formElement = document
//       .getElementById('form')
//       .addEventListener('submit', function (event) {
//         console.log('Form submitted!');
//         event.preventDefault();

//         const formData = new FormData(event.target);

//         const postUserInput = {
//           userID: currentUser.id,
//           date: '2023/07/02',
//           numOunces: formData.get('waterIntake'),
//         };

//         console.log('Form submitted!');

//         postSavedHydration(postUserInput)
//           .then((json) => {
//             displayNewHydrationEntry(json);
//             console.log(json);
//           })
//           .catch((err) => console.error(`Error at: ${err}`));

//         event.target.reset();
//       });

// const motivationLevels = {
//     level1: {
//       title: 'Not Motivated',
//       description: 'Fried',
//       descriptionText: 'Feeling overwhelmed',
//       image: './images/L1a.jpg',
//       advice: 'Prioritize self-care. Spend some time outside.',
//     },
//     level2: {
//       title: 'Slightly Motivated',
//       description: 'Fluttering Feathers.',
//       descriptionText: 'Starting to feel motivated.',
//       image: './images/L2.jpg',
//       advice: 'Celebrate the small wins!',
//     },
//     level3: {
//       title: 'Moderately Motivated',
//       description: 'Cluck and Strut!',
//       descriptionText: 'Stepping up to the challenge.',
//       image: './images/L3.jpg',
//       advice: 'Stay focused and surround yourself with positive influences!',
//     },
//     level4: {
//       title: 'Highly Motivated',
//       description: 'Cock-a-doodle Can-Do!',
//       descriptionText: 'Feeling eggs-cited and energized!',
//       image: './images/L4.jpg',
//       advice: 'Embrace challenges and maintain a can-do attitude.',
//     },
//     level5: {
//       title: 'Extremely Motivated',
//       description: 'Hard-Boiled Dynamo!',
//       descriptionText: 'Congratulations! Maximum motivation achieved!',
//       image: './images/L5.jpg',
//       advice: 'Keep pushing your limits and inspiring others!',
//     },
//   };

//   const setMotivationLevel = (level) => {
//     let motivationLevel = motivationLevels[level];
//     if (motivationLevel) {
//       motivationTitle.innerText = motivationLevel.title;
//       motivationDescription.innerText = motivationLevel.description;
//       motivationText.innerHTML = motivationLevel.descriptionText;
//       motivationImage.src = motivationLevel.image;
//       motivationAdvice.innerHTML = motivationLevel.advice;
//       motivationDropdown.value = level;
//     } else {
//       motivationTitle.innerText = 'Get Motivated!';
//       motivationDescription.innerText = 'Choose your level';
//       motivationText.innerHTML =
//         'The only limit to your greatness is the extent of your determination.';
//       motivationImage.src = './images/default.jpg';
//       motivationImage.alt = '';
//       motivationAdvice.innerHTML = '';
//       motivationDropdown.value = '';
//     }
//   };

//   motivationDropdown.addEventListener('change', (event) => {
//     setMotivationLevel(event.target.value);
//   });
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
