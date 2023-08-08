import {
  chooseDestinationField,
  numTravelersField,
  calendarField,
  numDaysField,
} from './domUpdates';

import { fetchedData } from './apiCalls';

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/
let travelerData = {};

let tripData = {
  newTripID: 0,
  destinationID: 0,
  destination: '',
  estimatedLodgingCosts: 0,
  estimatedFlightCostPerPerson: 0,
  totalTripCosts: 0,
  numTravelers: 0,
  date: 'yyyy/mm/dd',
  duration: 0,
  status: '',
  suggestedActivities: [],
};

/* ~~~~~~~~ Traveler Data Functions ~~~~~~~~ */

const getCurrentTraveler = (travelers, id) => {
  return travelers.find((traveler) => traveler.id === id);
};

const setTravelerData = (travelers, userID) => {
  travelerData = getCurrentTraveler(travelers, userID);
};

const getTravelerData = () => {
  return travelerData;
};

/* ~~~~~~~~ Input Form Data Functions ~~~~~~~~ */

const getTravelerInputs = () => {
  const newTripData = {
    id: parseInt(fetchedData.trips.length + 1),
    userID: travelerData.id,
    destinationID: parseInt(chooseDestinationField.value),
    travelers: parseInt(numTravelersField.value),
    date: calendarField.value.split('-').join('/'),
    duration: parseInt(numDaysField.value),
    status: 'pending',
    suggestedActivities: [],
  };

  return newTripData;
};

/* ~~~~~~~~ Trip Data Functions ~~~~~~~~ */

const getAllTrips = (trips, userID) => {
  return trips.filter((trip) => {
    return trip.userID === userID;
  });
};

const getPastTrips = (trips, userID) => {
  return trips.filter((trip) => {
    return trip.userID === userID && trip.status === 'approved';
  });
};

const getUpcomingTrips = (trips, userID) => {
  return trips.filter((trip) => {
    return trip.userID === userID && trip.status === 'pending';
  });
};

const findDestinationName = () => {
  const destinationName = fetchedData.destinations.find((destination) => {
    if (destination.id === tripData.destinationID) {
      return destinationName;
    }
  });
};

const getEstimatedLodgingCosts = (destinationID, duration, numTravelers) => {
  const costs = fetchedData.destinations.reduce((acc, destination) => {
    if (destination.id === destinationID)
      acc = destination.estimatedLodgingCostPerDay * duration * numTravelers;
    return acc;
  }, 0);
  return costs;
};

const getFlightCostOneTraveler = (destinationID) => {
  const flightCost = fetchedData.destinations.find((destination) => {
    if (destination.id === destinationID) {
      return destination.estimatedFlightCostPerPerson;
    }
    return flightCost;
  });
};

const getTotalEstimatedTripCosts = () => {
  const flightCosts = tripData.numTravelers * estimatedFlightCostPerPerson;
  const lodgingCosts = tripData.estimatedLodgingCosts * tripData.duration;
  const travelerAgentFee = (flightCosts + lodgingCosts) * 0.1;
  const totalTravelCost = flightCosts + lodgingCosts + travelerAgentFee;
  return totalTravelCost;
};

const setTripData = (e) => {
  e.preventDefault();
  tripData.newTripID = parseInt(fetchedData.trips.length + 1);
  tripData.destinationID = parseInt(chooseDestinationField.value);
  tripData.destination = findDestinationName();
  tripData.numTravelers = parseInt(numTravelersField.value);
  tripData.date = calendarField.value.split('-').join('/');
  tripData.duration = parseInt(numDaysField.value);
  tripData.estimatedLodgingCosts = getEstimatedLodgingCosts();
  tripData.estimatedFlightCostPerPerson = getFlightCostOneTraveler();
  tripData.totalTripCosts = getTotalEstimatedTripCosts();
  tripData.status = 'pending';
  console.log('UPDATED TRIP DATA', tripData);
};

const getAnnualTripsByUser = (userID) => {
  const totalTrips = fetchedData.trips.reduce((acc, trip) => {
    if (trip.userID === userID) {
      return (acc += 1);
    }
    return totalTrips;
  }, 0);
};

// ~~~~~~~~~Iteration 1 ~~~~~~~~~~~~~

//helper function to get trip info
// const getTripInfo = (trips, userID, status) => {
//     return trips.filter(trip => {
//         return trip.userID === userID &&
//         (trip.status === status || status === undefined)
//     })
// }

//Travelers dataSet: id = the traveler's ID
//Trips dataSet: id = Trip#;  userID = traveler#; destinationID = destination#
//Destinations dataSet id = destination#

//helper function for checking login credentials
function isValidCredentials(username, password) {
  const validUsernamePattern = /^traveler\d+$/;
  return validUsernamePattern.test(username) && password === 'travel';
}

// const getPastTrips = (userID) => {

//     getTripInfo(fetchedData.trips, 50, 'approved')
// }

//   const getTotalAnnualSpend = (trips, destinations, id, year) => {
//     const filterdTripsByYear = trips.filter(trip => trip.userID === id && trip.)

//     }

// Total amount I have spent on trips this year. This should be calculated from the trips data and include a travel agent’s 10% fee

//look up ID in trips - get the desitnation ID, then look up destination ID in destinations and then do math :-(
//   }

// ~~~~~~~~~Iteration 2 ~~~~~~~~~~~~~

//DOM Manipulation

//have a collection of methods that do nothing other than pull the information from the form - getSelectedTripDate; getSelectedDestination, getSelectedNumberOfTravelers - when you want to display a new trip, you will pull these pieces and then stuff them back into the DOM

//   const displayNewTrip = () => {
//       //show trip details (date, duration, number of travelers, destination)
//       //show estimated cost with 10% trave; agent's fee
//       //status is pending
//   }

//   const createNewTrip = (travelerID) => {
//     // select a:
//         // date
//         // duration
//         // number of travelers
//         // choose from a list of destinations
//         // estimated cost (with a 10% travel agent fee) for the trip

//   }

//Iteration 4 - Login

//   const getUserLogin = () => {
//       //get value from userName field and password field
//   }

/*
  
  username: traveler50 (where 50 is the ID of the user)
  password: travel
  
  */

export {
  getCurrentTraveler,
  // getTripInfo
  getAllTrips,
  getPastTrips,
  getUpcomingTrips,
  getTravelerData,
  setTravelerData,
  setTripData,
  getAnnualTripsByUser,
  getTravelerInputs,
};
