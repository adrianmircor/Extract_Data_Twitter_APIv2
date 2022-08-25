import { Request, Response } from "express";
import { ITweet } from "../interface/tweet.interface";

import { uploadDataTwitterService, uploadDataTwitterWithNextTokenService } from "../service/uploadDataTwitter.service";
import { loadDataTwitterController } from "./loadDataTwitter.controller";

const uploadDataTwitterController = async (req: Request, res: Response) => {

    let dateNow = new Date();
    console.log('Fecha ahora:', dateNow.getTime());

    let differenceDate = dateNow.getTime() - 6.000e+8 // 6.000e+8 aprox 7 dias
    console.log('Diferencia:', differenceDate);

    let sinceDate = new Date(differenceDate).toISOString(); // Desde la fecha
    console.log('Desde la fecha:', sinceDate);

    let responseClean;
    responseClean = await uploadDataTwitterService(sinceDate);

    let arrayTweets: ITweet[] = [];
    responseClean.data.map((tweet) => {
        arrayTweets.push(tweet)
    });

    let nextToken = responseClean.meta.next_token;

    let arrayTweetsWithNextToken = await uploadDataTwitterWithNextTokenController(sinceDate, nextToken);

    arrayTweetsWithNextToken.map((tweetNextToken) => {
        arrayTweets.push(tweetNextToken);
    })

    await loadDataTwitterController(arrayTweets);

    res.json(arrayTweets)
}

const uploadDataTwitterWithNextTokenController = async (sinceDate: string, nextToken: string) => {

    let responseCleanWithNextToken;
    let arrayTweetsWithNextToken: ITweet[] = [];
    let contador = 0;
    let resultados = 0

    do {
        responseCleanWithNextToken = await uploadDataTwitterWithNextTokenService(sinceDate, nextToken);

        responseCleanWithNextToken.data.map((tweet) => {
            arrayTweetsWithNextToken.push(tweet)
        });

        console.log('Next_Token:', responseCleanWithNextToken.meta.next_token);
        nextToken = responseCleanWithNextToken.meta.next_token;

        contador++;
        resultados = responseCleanWithNextToken.meta.result_count + resultados;
    } while (responseCleanWithNextToken.meta.next_token != undefined);

    console.log('Cantidad de tweets traidos:', resultados);

    return arrayTweetsWithNextToken;
}

export { uploadDataTwitterController }
