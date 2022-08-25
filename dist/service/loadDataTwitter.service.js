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
exports.loadDataTwitterService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadDataTwitterService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        'Content-Type': 'application/json'
    };
    let responseLoadData;
    try {
        responseLoadData = yield axios_1.default.post('https://sheet.best/api/sheets/' + process.env.SB_TOKEN, JSON.stringify(data), { headers }).then((response) => {
            console.log('loadDataTwitterService Response:', response); // Servicio responde tipo ITweet
        })
            .catch((error) => {
            console.log('loadDataTwitterService Error:', error);
        });
        ;
    }
    catch (error) {
        console.log('loadDataTwitterService', error);
    }
});
exports.loadDataTwitterService = loadDataTwitterService;
