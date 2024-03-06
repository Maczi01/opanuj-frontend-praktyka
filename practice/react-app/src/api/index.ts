import axios from 'axios';
import { Article } from '../types';

export const getArticles = async () => {
  const response = await axios('http://localhost:3001/api/data/articles');
  return response.data;
};

export const createArticle = async (article: Article) => {
  const response = await axios.post('http://localhost:3001/api/data/articles', article);
  return response.data;
}