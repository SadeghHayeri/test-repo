const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        let {name, phone, age, sex, hasAutism, answers} = req.body;

        const answerString = answers.join('');
        const hasAutismString = hasAutism ? 'بلی' : 'خیر';
        const sexString = sex === 'male' ? 'پسر' : 'دختر';
        const ageString = age + 1;

        name = '-)';
        const xmlBodyStr = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">
                            <v:Header />
                                <v:Body>
                                    <Alternative xmlns="http://tempuri.org/" id="o0" c:root="1">
                                        <text i:type="d:string">#@,2.0#Null, Nothing#${name},age,${ageString},${sexString},${hasAutismString},${phone}#0${answerString}</text>
                                    </Alternative>
                                </v:Body>
                            </v:Envelope>`;

        const config = {
            headers: {
                'SOAPAction': 'http://tempuri.org/Alternative',
                'Content-Type': 'text/xml',
            }
        };

        try {
            const request = await axios.post('http://aris.ut.ac.ir/mood/ut_mood_wcf.asmx', xmlBodyStr, config);
            const st = request.data.indexOf('<AlternativeResult>');
            const en = request.data.indexOf('</AlternativeResult>');
            const result = request.data.slice(st + 30 + name.length, en);
            res.status(200).json({res: 'OK', result});
        } catch (e) {
            res.status(400).json({res: 'ERR', msg: e.toString()});
        }
    } catch (e) {
        res.status(400).json({res: 'ERR', msg: 'خطای سیستمی رخ داده است'});
    }
});

module.exports = router;
