import { Placeholder } from './Placeholder.tsx';
import { Article } from '../types';
import { getArticles } from '../api';
import { useQuery } from '@tanstack/react-query';

export const ArticleList = ({ title }: {title: string}) => {

  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="border border-2 m-2">
      <h2 className='font-bold text-xl mt-2'>{title}</h2>
      {isLoading && <Placeholder lines={5} height={24} />}
      {data?.articles.map((article: Article) => (
        <div className='bg-white mt-2 p-2 rounded-lg shadow ' key={article.id}>
          <h2 className='font-bold'>{article.title}</h2>
          <p>{article.content}</p>
          <div className='flex flex-row items-center mb-2'>
            <img
              src={`https://randomuser.me/api/portraits/women/${article.id}.jpg`}
              className='w-4 h-4 mr-1 rounded-full'
            />
            <p>{article.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};