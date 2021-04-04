import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
} from 'react-query';
import Subscriptions from './subscriptions';

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Subscriptions />
    </QueryClientProvider>
  )
}

export default Home;