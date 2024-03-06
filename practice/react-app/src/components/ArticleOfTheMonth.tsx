import { Placeholder } from './Placeholder.tsx';
import { getArticles } from '../api';
import { useQuery } from '@tanstack/react-query';

export const ArticleOfTheMonth = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  const bestArticle = data?.articles[0];

  return (
    <div className="w-1/2 m-2">
      <h2 className='font-bold text-xl mt-2'>Article Of The Month</h2>
      {isLoading && <Placeholder lines={5} height={24} />}
      {data && <div className='bg-white mt-2 p-2 rounded-lg shadow' key={bestArticle.id}>
        <h2 className='font-bold'>{bestArticle.title}</h2>
        <p>{bestArticle.content}</p>
        <div className='flex flex-row items-center mb-2'>
          <img
            src={`https://randomuser.me/api/portraits/women/${bestArticle.id}.jpg`}
            className='w-4 h-4 mr-1 rounded-full'
          />
          <p>{bestArticle.author}</p>
        </div>
      </div>}
    </div>
  );
};