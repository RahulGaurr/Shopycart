import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv'
import DefaultData from './default.js';

import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/route.js';
import {v4 as uuid} from 'uuid'

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router);

const PORT= process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL= process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-obifvgc-shard-00-00.vjt5ces.mongodb.net:27017,ac-obifvgc-shard-00-01.vjt5ces.mongodb.net:27017,ac-obifvgc-shard-00-02.vjt5ces.mongodb.net:27017/?ssl=true&replicaSet=atlas-llaqji-shard-0&authSource=admin&retryWrites=true&w=majority`


Connection(URL);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = ' https://flipkartcloneusingmernstack.herokuapp.com/callback';
paytmParams['EMAIL'] = 'rahulgaurr09@gmail.com';
paytmParams['MOBILE_NO'] = '1234567890';
