import { useReducer } from 'react';
import { commentsReducer } from '../reducers/commentsReducer.ts';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '../App.tsx';
import { CommentsForm } from './CommentsForm.tsx';

export const Comments = () => {
  const [comments, dispatch] = useReducer(commentsReducer, []);

  const {
    data,
    error,
    isLoading,
    refetch
  } =
    useQuery({
      queryKey: ['users'],
      queryFn: () => getComments(),
      enabled: true
    });

  console.log('chui', data?.comments);

  return (
    <>
      <h2 className='font-bold text-xl my-2'>Comments</h2>
      {/*{comments.length === 0 && <Placeholder lines={3} height={16} />}*/}
      <CommentsForm comments={data?.comments || []} />
      {data?.comments.map((comment) => (
        <div
          className='bg-violet-400 rounded-xl text-white p-4 mb-2 shadow'
          key={comment.id}
        >
          <p className='italic'>"{comment.text}"</p>
          <p className='text-sm text-violet-900'>
            {comment.author} - Rating {comment.rating}/5
          </p>
        </div>
      ))}
    </>
  );
}