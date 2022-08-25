import axios from 'axios';
import dotenv from 'dotenv';
import { ITweet } from '../interface/tweet.interface';

dotenv.config();

export const loadDataTwitterService = async (data: ITweet[]) => {

    const headers = {
        'Content-Type': 'application/json'
    };

    let responseLoadData: any;

    try {
        responseLoadData = await axios.post(
            'https://sheet.best/api/sheets/' + process.env.SB_TOKEN,
            JSON.stringify(data),
            { headers }
        ).then((response: any) => {
            console.log('loadDataTwitterService Response:', response) // Servicio responde tipo ITweet
        })
        .catch((error: any) => {
            console.log('loadDataTwitterService Error:', error)
        });;
    } catch (error) {
        console.log('loadDataTwitterService', error);
    }
}