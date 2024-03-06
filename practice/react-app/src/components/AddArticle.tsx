import { createArticle } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Article } from '../types';

export const AddArticle = () => {

  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation<Article, Error, Article>({
    mutationFn: createArticle,
    onSuccess: () => {
      alert('Article added successfully');
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const article = {
      title: input,
      content: 'lorem ipsum',
      author: 'author',
    };
    mutation.mutate(article);
    setInput('');
  };

  return (
    <div className='w-1/2 p-3 m-2 border'>
      <h2 className='font-bold text-xl mt-2'>Add Article</h2>
      <p>Just add your title, AI magically creates content based on your title</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          className='w-full p-2 border border-gray-300 rounded-lg mb-2'
          value={input}
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg'>Add Article</button>
      </form>
    </div>
  );
};