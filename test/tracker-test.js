import chai from 'chai';
const expect = chai.expect;
import {
  getCurrentTraveler,
  setTravelerData,
  getTravelerData,
  getTravelerInputs,
  getAllTrips,
} from './tracker-function';
import { travelersTestData } from './travelersTestData';
import { tripsData } from './tripsData';

describe('Traveler Data Functions', () => {
  let travelerData;

  describe('getCurrentTraveler', () => {
    it('should return the correct traveler based on userID', () => {
      const result = getCurrentTraveler(travelersTestData, 3);
      expect(result).to.deep.equal({
        id: 3,
        name: 'Sibby Dawidowitsch',
        travelerType: 'shopper',
      });
    });

    it('should return undefined when the travelers array is empty', () => {
      const result = getCurrentTraveler([], 1);
      expect(result).to.be.undefined;
    });

    it('should return undefined for non-existent userID', () => {
      const result = getCurrentTraveler(travelersTestData, 999);
      expect(result).to.be.undefined;
    });
  });

  describe('setTravelerData', () => {
    it('should set travelerData correctly based on userID', () => {
      setTravelerData(travelersTestData, 4);
      expect(travelersTestData[3]).to.deep.equal({
        id: 4,
        name: 'Leila Thebeaud',
        travelerType: 'photographer',
      });
    });

    it('should set travelerData to undefined for non-existent userID', () => {
      setTravelerData(travelersTestData, 999);
      expect(travelerData).to.be.undefined;
    });
  });

  describe('getTravelerData', () => {
    it('should return the correct travelerData', () => {
      setTravelerData(travelersTestData, 5);
      const data = getTravelerData();
      expect(data).to.deep.equal({
        id: 5,
        name: 'Tiffy Grout',
        travelerType: 'thrill-seeker',
      });
    });
  });
});

describe('getTravelerInputs function - Sad Paths', () => {
  global.travelerData = travelersTestData[0];

  beforeEach(() => {
    global.chooseDestinationField = { value: '2' };
    global.numTravelersField = { value: '3' };
    global.calendarField = { value: '2023-08-01' };
    global.numDaysField = { value: '7' };
    global.fetchedData = {
      trips: [{}],
    };
    global.travelerData = travelersTestData[0];
  });

  it('should handle non-numeric traveler count', () => {
    global.numTravelersField.value = 'three';
    const result = getTravelerInputs();
    expect(result.travelers).to.be.NaN;
  });

  it('should handle missing travelerData', () => {
    global.travelerData = { id: null };
    const result = getTravelerInputs();
    expect(result.userID).to.be.null;
  });
});

describe('getAllTrips function', () => {
  it('should return all trips for a user with multiple trips', () => {
    const result = getAllTrips(tripsData, 44);
    expect(result).to.have.lengthOf(2);
    expect(result[0].destinationID).to.equal(49);
    expect(result[1].destinationID).to.equal(33);
  });

  it('should return an empty array if the user has no trips', () => {
    const result = getAllTrips(tripsData, 999);
    expect(result).to.be.empty;
  });

  it('should return an empty array if the trips array is empty', () => {
    const result = getAllTrips([], 1);
    expect(result).to.be.empty;
  });

  it('should return a single trip for a user with one trip', () => {
    const result = getAllTrips(tripsData, 35);
    expect(result).to.have.lengthOf(1);
    expect(result[0].destinationID).to.equal(25);
  });

  it('should return an empty array for a non-number userID', () => {
    const result = getAllTrips(tripsData, 'stringUserID');
    expect(result).to.be.empty;
  });
});
