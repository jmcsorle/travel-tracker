const fetchAPIData = (dataSet) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to GET ${dataSet}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error ('Catch Error - fetch rejected the request', error))
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
    fetchAPIData,
    fetchPromises
}