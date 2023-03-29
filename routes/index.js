const express = require('express');
const Africastalking = require('africastalking');
const router = express.Router();
const config = require('config');
const saveAsCSV = require('../utils/csv.js');


const AT = Africastalking(config.get('AT')).AIRTIME;
console.log(AT);

const sendAirtime = async (phoneNumber) => {
    const output = await AT.send({
        maxNumRetry: 1,
        recipients: [
            {
                phoneNumber: `${phoneNumber}`,
                amount: 10,
                currencyCode: 'KES',
            }
        ],
    });
    console.log('phone number', phoneNumber);
    console.log({ output });
};


router.get('/', (req, res) => res.send('Hola!'));

router.post('/antifgm', async (req, res) => {
    try {
        const { sessionId, serviceCode, phoneNumber, text } = req.body;

        let response = '';

        if (text == '') {
            response = `CON Report Fgm Case and get rewarded
            1. Report
            `;
        } else if (text == '1') {
            response = `CON Where are you located`;
          
        } else if (text.split('*').length == 2) {
            response = `CON Did this happen to you or someone else`;
           
        } else if (text.split('*').length == 3) {
            response = `CON Provide us with additional information`;
           
        } else if (text.split('*').length == 4) {
            const location = text.split('*')[1];
                const identity = text.split('*')[2];
                const additionalInfo = text.split('*')[3];

                const inputData = {
                    location,
                    identity,
                    additionalInfo,
                };

                const fgmReportData = {
                    ...inputData,
                    phoneNumber,
                    sessionId,
                    date: new Date()
                };
                sendAirtime(phoneNumber);
                saveAsCSV(fgmReportData);
                console.log({ fgmReportData });

                response = `END Thank you for reporting fgm case. You will receive airtime shortly.`;
        }
        res.set('Content-Type: text/plain');
        res.send(response);
    } catch (error) {
        console.trace(error);
        response = `END There is an error. Try again later.`;
        res.set('Content-Type: text/plain');
        res.send(response);
    }
});

module.exports = router;
