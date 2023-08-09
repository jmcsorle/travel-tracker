const fetchedData = {};

const fetchAPIData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to GET ${dataSet}`);
        return Promise.reject();
      }
      if (response.status !== 200) {
        console.log(`Received status ${response.status}`);
        return Promise.reject();
      }
      return response.json()
    })
    .then(data => fetchedData[dataSet] = data[dataSet])
    .catch(error => console.error ('Received Error from Catch', error))
}

const fetchPromises = [
  fetchAPIData('travelers'),
  fetchAPIData('trips'),
  fetchAPIData('destinations')
]

/* ~~~~~~~~~~ POST ~~~~~~~~~~

Add new trip:

Required properties for request:
{
    id: <number>,
    userID: <number>,
    destinationID: <number>,
    travelers: <number>,
    date: <string 'YYYY/MM/DD'>,
    duration: <number>,
    status: <string 'approved' or 'pending'>,
    suggestedActivities: <array of strings>
}

Sample Successful Response Message:

{message: 'Trip with id <id> successfully posted', newTrip: <Object with trip info just posted>}

*/

export {
  fetchedData,
  fetchPromises
}