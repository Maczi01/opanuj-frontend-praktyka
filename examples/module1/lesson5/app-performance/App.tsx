import bookshelf from './media/image-v2.png';
// import { useEffect, useReducer, useState } from 'react';
// import { commentsReducer } from './reducers/commentsReducer.ts';
// import { useLoaderData } from 'react-router-dom';
// import { Bootstrap } from './types/Bootstrap.ts';
import axios from 'axios';
import { Comment } from './types/Comment.ts';
// import { useQuery } from '@tanstack/react-query';
import { Comments } from './components/Comments.tsx';

const BASE_URL = 'http://localhost:3000/api/data';
const API_ENDPOINT = '/comments';
const RESPONSE_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: RESPONSE_TIMEOUT
});

export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>(`${API_ENDPOINT}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error during fetching data: ${error.message || 'Unknown error'}`);
    throw new Error(`Error during fetching data: ${error.message || 'Unknown error'}`);
  }
};

// function Placeholder({ lines, height }: { lines: number; height: number }) {
//   return (
//     <>
//       {Array.from({ length: lines }).map((_, i) => (
//         <div
//           key={i}
//           className={`animate-pulse h-${height} bg-gray-300 rounded-lg mb-2`}
//         />
//       ))}
//     </>
//   );
// }

// function Comments() {
//   const [comments, dispatch] = useReducer(commentsReducer, []);
//
//   const {
//     data,
//     error,
//     isLoading,
//     refetch
//   } =
//     useQuery({
//       queryKey: ['users'],
//       queryFn: () => getComments(),
//       enabled: true
//     });
//
//   console.log('chui', data?.comments);
//
//   return (
//     <>
//       <h2 className='font-bold text-xl my-2'>Comments</h2>
//       {/*{comments.length === 0 && <Placeholder lines={3} height={16} />}*/}
//       <CommentsForm comments={data?.comments || []} dispatch={dispatch} />
//       {data?.comments.map((comment) => (
//         <div
//           className='bg-violet-400 rounded-xl text-white p-4 mb-2 shadow'
//           key={comment.id}
//         >
//           <p className='italic'>"{comment.text}"</p>
//           <p className='text-sm text-violet-900'>
//             {comment.author} - Rating {comment.rating}/5
//           </p>
//         </div>
//       ))}
//     </>
//   );
// }

// function CommentsForm({
//                         comments,
//                       }: {
//   comments: Comment[];
// }) {
//   // const { commentsAPI } = useLoaderData() as Bootstrap;
//   const [newComment, setNewComment] = useState('');
//   const [newRating, setNewRating] = useState('');
//
//   function storeNewComment(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     dispatch({
//       type: 'ADD_COMMENT',
//       payload: {
//         id: comments.length + 1,
//         text: newComment,
//         author: 'John Doe',
//         rating: parseInt(newRating, 10)
//       }
//     });
//     setNewComment('');
//     setNewRating('');
//     axios
//       .post(commentsAPI, {
//         comment: newComment,
//         rating: newRating
//       })
//       .catch(() => {
//         // Rollback the comment if the request fails
//       });
//   }
//
//   return (
//     <>
//       {comments.length > 0 && (
//         <form onSubmit={(e) => storeNewComment(e)}>
//           <div className='flex flex-col'>
//             <input
//               value={newComment}
//               type='text'
//               placeholder='Write a comment...'
//               className='w-full p-2 rounded-lg mb-2'
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <input
//               value={newRating}
//               type='text'
//               placeholder='Rating'
//               className='w-full p-2 w-12 rounded-lg'
//               onChange={(e) => setNewRating(e.target.value)}
//             />
//           </div>
//           <button className='bg-violet-400 text-white p-2 rounded-lg mt-2'>
//             Submit
//           </button>
//         </form>
//       )}
//     </>
//   );
// }


function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='md:grid md:grid-cols-4 gap-x-8'>
        <div className='col-span-1'>
          <h1 className='text-3xl font-bold'>Library</h1>
          <img
            className='rounded-xl shadow mb-2'
            src={bookshelf}
            alt='Bookshelf'
          />
          <Comments />
        </div>
      </div>
    </div>
  );
}


export default App;
