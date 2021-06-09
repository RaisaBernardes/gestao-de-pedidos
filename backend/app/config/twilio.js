const accountSid = 'AC277ede00288325cfa1af0edfd8ca5f40'; 
const authToken = '197b26c260872cdb9e82296fd7917ca8'; 
const client = require('twilio')(accountSid, authToken); 

module.exports = client;