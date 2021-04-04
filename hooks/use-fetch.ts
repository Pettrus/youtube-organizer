import axios from 'axios';
import { useQuery, QueryObserverResult } from 'react-query';

const useFetch = (key: string | string[], url: string): QueryObserverResult<any, unknown> => {
    const getRequest = async () => {
        const response = await axios.get(url);

        return response.data;
    }

    return useQuery(key, getRequest);
};

export default useFetch;