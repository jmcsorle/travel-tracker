/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/
const getCurrentTraveler = (travelers, id) => {
    return travelers.find(traveler => traveler.id === id);
};
  
  // ~~~~~~~~~Iteration 1 ~~~~~~~~~~~~~
  
const getAllTrips = (trips, id, status) => {
    return trips.filter(trip => {
        return trip.id === id &&
        (trip.status === status || status === undefined)
    })
}
  
  const getTotalAnnualSpend = (trips, destinations, id) => {
      // Total amount I have spent on trips this year. This should be calculated from the trips data and include a travel agent’s 10% fee

      //look up ID in trips - get the desitnation ID, then look up destination ID in destinations and then do math :-(
  }
  
  // ~~~~~~~~~Iteration 2 ~~~~~~~~~~~~~
  
  
  //DOM Manipulation

  //have a collection of methods that do nothing other than pull the information from the form - getSelectedTripDate; getSelectedDestination, getSelectedNumberOfTravelers - when you want to display a new trip, you will pull these pieces and then stuff them back into the DOM

  const displayNewTrip = () => {
      //show trip details (date, duration, number of travelers, destination)
      //show estimated cost with 10% trave; agent's fee
      //status is pending
  }

  const createNewTrip = (travelerID) => {
    // select a:
        // date
        // duration
        // number of travelers
        // choose from a list of destinations
        // estimated cost (with a 10% travel agent fee) for the trip
  
  }
  
  //Iteration 4 - Login
  
  const getUserLogin = () => {
      //get value from userName field and password field
  }
  
  /*
  
  username: traveler50 (where 50 is the ID of the user)
  password: travel
  
  */
  
  


export {
    getCurrentTraveler,
    getAllTrips
}

