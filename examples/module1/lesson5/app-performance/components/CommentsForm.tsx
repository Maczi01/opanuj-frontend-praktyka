import { useState } from 'react';
import axios from 'axios';
import { Comment } from '../types/Comment.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createArticle = async (comment: Comment) => {
  const response = await axios.post('http://localhost:3001/api/data/comments', comment);
  return response.data;
}

export const CommentsForm = ({ comments } : {
  comments: Comment[];
}) => {
  // const { commentsAPI } = useLoaderData() as Bootstrap;
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');


  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation<Comment, Error, Comment>({
    mutationFn: createArticle,
    onSuccess: () => {
      alert('Article added successfully');
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = {
      id: 99,
      author: 'string',
      text: 'string',
      rating: 6,

    };
    mutation.mutate(comment);
    setInput('');
  };


  // function storeNewComment(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   dispatch({
  //     type: 'ADD_COMMENT',
  //     payload: {
  //       id: comments.length + 1,
  //       text: newComment,
  //       author: 'John Doe',
  //       rating: parseInt(newRating, 10)
  //     }
  //   });
  //   setNewComment('');
  //   setNewRating('');
  //   axios
  //     .post(commentsAPI, {
  //       comment: newComment,
  //       rating: newRating
  //     })
  //     .catch(() => {
  //       // Rollback the comment if the request fails
  //     });
  // }

  return (
    <>
      {comments.length > 0 && (
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
      )}
    </>
  );
}