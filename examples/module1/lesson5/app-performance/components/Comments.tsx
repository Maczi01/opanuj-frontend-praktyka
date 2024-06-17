import { Comment } from '../types/Comment.ts';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createArticle = async (comment: Comment) => {
  const response = await axios.post('http://localhost:3001/api/data/comments?timeout=5000', comment);
  return response.data;
};

export const Comments = ({ data }: { data: any }) => {

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');

  const queryClient = useQueryClient();

  const { isPending, variables, mutate } = useMutation({
    mutationFn: createArticle,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = {
      id: crypto.randomUUID(),
      author: 'Anonymous Author',
      text: newComment,
      rating: parseInt(newRating)
    };
    mutate(comment);
    setNewComment('');
    setNewRating('');
  };

  return (
    <>
      <h2 className='font-bold text-xl my-2'>Comments</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <input
            value={newComment}
            type='text'
            placeholder='Write a comment...'
            className='w-full p-2 rounded-lg mb-2'
            onChange={(e) => setNewComment(e.target.value)}
          />
          <input
            value={newRating}
            type='text'
            placeholder='Rating'
            className='w-full p-2 w-12 rounded-lg'
            onChange={(e) => setNewRating(e.target.value)}
          />
        </div>
        <button className='bg-violet-400 text-white p-2 rounded-lg mt-2'>
          Submit
        </button>
      </form>
      {data?.comments.map((comment: Comment) => (
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
      {isPending &&
        <div
          className={`${isPending ? 'bg-violet-400/50' : 'bg-violet-400'} rounded-xl text-white p-4 mb-2 shadow`}
        >
          <p className='italic'>"{variables.text}"</p>
          <p className='text-sm text-violet-900'>
            {variables.author} - Rating {variables.rating}/5
          </p>
        </div>
      }
    </>
  );
};