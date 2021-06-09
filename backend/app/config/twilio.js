const accountSid = 'AC277ede00288325cfa1af0edfd8ca5f40';
const authToken = '5165a0e6946d1361b8eaf95cd4d6d2d9';
const client = require('twilio')(accountSid, authToken); 

module.exports = client;