import {
  chooseDestinationField,
  numTravelersField,
  calendarField,
  numDaysField,
  chooseYear,
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
  const filteredTrips = trips.filter((trip) => {
    trip.userID === userID && trip.status === 'approved';
  });
  console.log(filteredTrips);
  return filteredTrips;
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

const getTotalEstimatedTripCosts = (
  destinationID,
  lodgingCosts,
  numTravelers
) => {
  const flightCostsSingleTraveler = getFlightCostOneTraveler(destinationID);
  const totalFlightCosts = numTravelers * flightCostsSingleTraveler;
  const travelerAgentFee = (totalFlightCosts + lodgingCosts) * 0.1;
  const totalTravelCost = (
    totalFlightCosts +
    lodgingCosts +
    travelerAgentFee
  ).toFixed(2);
  return totalTravelCost;
};

const getAnnualTripCosts = (userID, year) => {
  year = chooseYear.value;
  userID = travelerData.id;
  console.log('USER ID', userID);
  console.log('FETCHED DATA', fetchedData.trips);
  const filteredTrips = fetchedData.trips.filter(
    (trip) =>
      trip.date.split('/')[0] === year &&
      trip.userID === userID &&
      trip.status === 'approved'
  );
  console.log('FILTERED TRIPS', filteredTrips);
  const totalCost = fetchedData.destinations.reduce((acc, destination) => {
    filteredTrips.forEach((trip) => {
      if (trip.destinationID === destination.id) {
        const estimatedLodging =
          trip.travelers *
          trip.duration *
          destination.estimatedLodgingCostPerDay;
        const estimatedFlightCosts =
          trip.travelers * destination.estimatedFlightCostPerPerson;
        const subtotal = estimatedLodging + estimatedFlightCosts;
        const travelAgentFee = subtotal * 0.1;
        acc += (subtotal + travelAgentFee).toFixed(2);
      }
    });
    return acc;
  }, 0);
  console.log('TOTAL COST', totalCost);
  return totalCost;
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
  //   getAnnualTripsByUser,
  getTravelerInputs,
  getEstimatedLodgingCosts,
  getTotalEstimatedTripCosts,
  getAnnualTripCosts,
  travelerData,
};
