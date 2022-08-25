"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDataTwitterController = void 0;
const uploadDataTwitter_service_1 = require("../service/uploadDataTwitter.service");
const loadDataTwitter_controller_1 = require("./loadDataTwitter.controller");
const uploadDataTwitterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dateNow = new Date();
    console.log('Fecha ahora:', dateNow.getTime());
    let differenceDate = dateNow.getTime() - 6.000e+8; // 6.000e+8 aprox 7 dias
    console.log('Diferencia:', differenceDate);
    let sinceDate = new Date(differenceDate).toISOString(); // Desde la fecha
    console.log('Desde la fecha:', sinceDate);
    let responseClean;
    responseClean = yield (0, uploadDataTwitter_service_1.uploadDataTwitterService)(sinceDate);
    let arrayTweets = [];
    responseClean.data.map((tweet) => {
        arrayTweets.push(tweet);
    });
    let nextToken = responseClean.meta.next_token;
    let arrayTweetsWithNextToken = yield uploadDataTwitterWithNextTokenController(sinceDate, nextToken);
    arrayTweetsWithNextToken.map((tweetNextToken) => {
        arrayTweets.push(tweetNextToken);
    });
    yield (0, loadDataTwitter_controller_1.loadDataTwitterController)(arrayTweets);
    res.json(arrayTweets);
});
exports.uploadDataTwitterController = uploadDataTwitterController;
const uploadDataTwitterWithNextTokenController = (sinceDate, nextToken) => __awaiter(void 0, void 0, void 0, function* () {
    let responseCleanWithNextToken;
    let arrayTweetsWithNextToken = [];
    let contador = 0;
    let resultados = 0;
    do {
        responseCleanWithNextToken = yield (0, uploadDataTwitter_service_1.uploadDataTwitterWithNextTokenService)(sinceDate, nextToken);
        responseCleanWithNextToken.data.map((tweet) => {
            arrayTweetsWithNextToken.push(tweet);
        });
        console.log('Next_Token:', responseCleanWithNextToken.meta.next_token);
        nextToken = responseCleanWithNextToken.meta.next_token;
        contador++;
        resultados = responseCleanWithNextToken.meta.result_count + resultados;
    } while (responseCleanWithNextToken.meta.next_token != undefined);
    console.log('Cantidad de tweets traidos:', resultados);
    return arrayTweetsWithNextToken;
});
