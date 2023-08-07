

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/
let travelerData = {};
const getCurrentTraveler = (travelers, id) => {
  return travelers.find((traveler) => traveler.id === id);
};
const getTravelerData = () => {
    return travelerData
}

const setTravelerData = (travelers, userID) => {
    travelerData = getCurrentTraveler(travelers, userID)
}

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
  setTravelerData
};
