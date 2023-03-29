const { appendFileSync } = require('fs');
var userProfile = {
    date: 'date',
    sessionId: 'sessionId',
    phoneNumber: 'phoneNumber',
    location: 'location',
    // Happened_to: 'last_name',
    identity: 'identity',
    additionalInfo: 'additionalInfo'

    }

const saveAsCSV = ({ date, sessionId, phoneNumber, location, identity, additionalInfo }) => {
    const csv = `${date},${sessionId},${phoneNumber},${location},${identity},${additionalInfo},\n`;
    try {
      appendFileSync('./dataFiles/exportdata.csv', csv);
    } catch (err) {
      console.error(err);
    }
}

module.exports = saveAsCSV;

