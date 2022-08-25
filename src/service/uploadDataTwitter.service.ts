import axios from 'axios';
import dotenv from 'dotenv';
import { IMeta } from '../interface/meta.interface';
import { IResponse } from '../interface/response.interface';
import { ITweet } from '../interface/tweet.interface';

dotenv.config();

export const uploadDataTwitterService = async (fecha: string) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN as string,
    };

    let responseUploadData = {} as IResponse;

    try {
        responseUploadData = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=' + process.env.QUERY
            + '&max_results=' + process.env.MAX_RESULTS + '&start_time=' + fecha, {
            headers,
        });

    } catch (error) {
        console.log('uploadDataTwitterService', error);
    }

    let tweets: ITweet[] = [];
    let meta = {} as IMeta;
    tweets = responseUploadData.data.data;
    meta = responseUploadData.data.meta;

    let responseClean = {
        data: tweets,
        meta: meta
    }

    return responseClean;
}

export const uploadDataTwitterWithNextTokenService = async (fecha: string, token: string) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN as string,
    };

    let responseUploadDataWithNextToken = {} as IResponse;
    try {
        responseUploadDataWithNextToken = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=' + process.env.QUERY
            + '&max_results=' + process.env.MAX_RESULTS + '&start_time=' + fecha
            + '&next_token=' + token, {
            headers,
        });

    } catch (error) {
        console.log('uploadDataTwitterWithNextTokenService', error);
    }

    let tweets: ITweet[] = [];
    let meta = {} as IMeta;
    tweets = responseUploadDataWithNextToken.data.data;
    meta = responseUploadDataWithNextToken.data.meta;

    let responseCleanWithNextToken = {
        data: tweets,
        meta: meta
    }

    return responseCleanWithNextToken;
}