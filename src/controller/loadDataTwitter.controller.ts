import { ITweet } from '../interface/tweet.interface';
import { loadDataTwitterService } from '../service/loadDataTwitter.service';

export const loadDataTwitterController = async (data: ITweet[]) => {

    await loadDataTwitterService(data);
}