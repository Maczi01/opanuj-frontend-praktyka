import { Comments } from './components/Comments.tsx';
import { Comment } from './types/Comment.ts';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:3000/api/data';
const API_ENDPOINT = '/comments';
const RESPONSE_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: RESPONSE_TIMEOUT
});
const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(`${API_ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error during fetching data: ${error.message || 'Unknown error'}`);
    throw new Error(`Error during fetching data: ${error.message || 'Unknown error'}`);
  }
};

function App() {

  const { data} =
    useQuery({
      queryKey: ['comments'],
      queryFn: () => getComments(),
      enabled: true
    });


  return (
    <div className='max-w-7xl mx-auto'>
      <div className='md:grid md:grid-cols-4 gap-x-8'>
        <div className='col-span-1'>
          <h1 className='text-3xl font-bold'>Library</h1>
          <Comments data={data} />
        </div>
      </div>
    </div>
  );
}


export default App;
