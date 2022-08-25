import { IMeta } from "./meta.interface";
import { ITweet } from "./tweet.interface";

export interface IResponse {
    data: {
        data: ITweet[];
        meta: IMeta;
    }
}
