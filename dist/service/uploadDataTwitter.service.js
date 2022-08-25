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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDataTwitterWithNextTokenService = exports.uploadDataTwitterService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uploadDataTwitterService = (fecha) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
    };
    let responseUploadData = {};
    try {
        responseUploadData = yield axios_1.default.get('https://api.twitter.com/2/tweets/search/recent?query=' + process.env.QUERY
            + '&max_results=' + process.env.MAX_RESULTS + '&start_time=' + fecha, {
            headers,
        });
    }
    catch (error) {
        console.log('uploadDataTwitterService', error);
    }
    let tweets = [];
    let meta = {};
    tweets = responseUploadData.data.data;
    meta = responseUploadData.data.meta;
    let responseClean = {
        data: tweets,
        meta: meta
    };
    return responseClean;
});
exports.uploadDataTwitterService = uploadDataTwitterService;
const uploadDataTwitterWithNextTokenService = (fecha, token) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
    };
    let responseUploadDataWithNextToken = {};
    try {
        responseUploadDataWithNextToken = yield axios_1.default.get('https://api.twitter.com/2/tweets/search/recent?query=' + process.env.QUERY
            + '&max_results=' + process.env.MAX_RESULTS + '&start_time=' + fecha
            + '&next_token=' + token, {
            headers,
        });
    }
    catch (error) {
        console.log('uploadDataTwitterWithNextTokenService', error);
    }
    let tweets = [];
    let meta = {};
    tweets = responseUploadDataWithNextToken.data.data;
    meta = responseUploadDataWithNextToken.data.meta;
    let responseCleanWithNextToken = {
        data: tweets,
        meta: meta
    };
    return responseCleanWithNextToken;
});
exports.uploadDataTwitterWithNextTokenService = uploadDataTwitterWithNextTokenService;
