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

global.fetchedData = {
  trips: [{}], // Assuming there's one trip already
};

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

export {
  getCurrentTraveler,
  setTravelerData,
  getTravelerData,
  getTravelerInputs,
  getAllTrips,
};
