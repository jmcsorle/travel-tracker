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

/* ~~~~~~~~ Input Form Data Function ~~~~~~~~ */

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

// const findDestinationName = () => {
//   const destinationName = fetchedData.destinations.find((destination) => {
//     if (destination.id === tripData.destinationID) {
//       return destinationName;
//     }
//   });
// };

//calculation to feed into DOM function

const getEstimatedLodgingCosts = (destinationID, duration, numTravelers) => {
  const lodgingCosts = fetchedData.destinations.reduce((acc, destination) => {
    if (destination.id === destinationID)
      acc = destination.estimatedLodgingCostPerDay * duration * numTravelers;
    return acc;
  }, 0);
  return lodgingCosts;
};

const getFlightCostOneTraveler = (destinationID) => {
  const destinationInfo = fetchedData.destinations.find((destination) => {
    return destination.id === destinationID;
  });
  if (!destinationInfo) {
    console.log('Invalid Destination');
    return `Please complete all fields.`;
  }
  return destinationInfo.estimatedFlightCostPerPerson;
};

const getTotalEstimatedTripCosts = (destinationID, lodgingCosts, numTravelers) => {
    console.log('LODGING COST', lodgingCosts);
    console.log('DESTINATION ID', destinationID);
    console.log('NUMBER TRAVELERS', numTravelers)
  const flightCostsSingleTraveler = getFlightCostOneTraveler(destinationID);
  console.log('FLIGHT COST SINGLE TRAVELER', flightCostsSingleTraveler)
  const totalFlightCosts = numTravelers * flightCostsSingleTraveler;
  console.log('TOTAL FLIGHT COSTS', totalFlightCosts);
  const travelerAgentFee = (totalFlightCosts + lodgingCosts) * 0.1;
  console.log('TRAVELER AGENT', travelerAgentFee)
  const totalTravelCost = (totalFlightCosts + lodgingCosts + travelerAgentFee).toFixed(2);
  console.log('TOTAL COST', totalTravelCost)
  return totalTravelCost;
};

// const setTripData = (e) => {
//   e.preventDefault();
//   tripData.newTripID = parseInt(fetchedData.trips.length + 1);
//   tripData.destinationID = parseInt(chooseDestinationField.value);
//   tripData.destination = findDestinationName();
//   tripData.numTravelers = parseInt(numTravelersField.value);
//   tripData.date = calendarField.value.split('-').join('/');
//   tripData.duration = parseInt(numDaysField.value);
//   tripData.estimatedLodgingCosts = getEstimatedLodgingCosts();
//   tripData.estimatedFlightCostPerPerson = getFlightCostOneTraveler();
//   tripData.totalTripCosts = getTotalEstimatedTripCosts();
//   tripData.status = 'pending';
//   console.log('UPDATED TRIP DATA', tripData);
// };

const getAnnualTripsByUser = (userID) => {
  const totalTrips = fetchedData.trips.reduce((acc, trip) => {
    if (trip.userID === userID) {
      return (acc += 1);
    }
    return totalTrips;
  }, 0);
};

export {
  getCurrentTraveler,
  // getTripInfo
  getAllTrips,
  getPastTrips,
  getUpcomingTrips,
  getTravelerData,
  setTravelerData,
//   setTripData,
  getAnnualTripsByUser,
  getTravelerInputs,
  getEstimatedLodgingCosts,
  getTotalEstimatedTripCosts,
};
