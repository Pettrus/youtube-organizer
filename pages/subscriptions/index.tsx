import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
} from 'react-query';
import useFetch from '../../hooks/use-fetch';
import { Subscription } from '../../types';

const SubscriptionsPage = () => {
    const { data: subscriptions, isLoading } = useFetch('subscriptions', '/api/subscriptions')

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div>
            {console.log(subscriptions.map(sub => sub.snippet.resourceId.channelId))}
            {subscriptions.map(sub => (
                <div>
                    <h2>{sub.snippet.title}</h2>
                    <img src={sub.snippet.thumbnails?.default?.url} />
                </div>
            ))}
        </div>
    );
}

export default SubscriptionsPage;