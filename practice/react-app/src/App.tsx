import { ArticleList } from './components/ArticleList.tsx';
import { ArticleOfTheMonth } from './components/ArticleOfTheMonth.tsx';
import { AddArticle } from './components/AddArticle.tsx';

function App() {

  return (
    <div className='w-full'>
      <div className='w-4/5 mx-auto flex flex-row'>
        <ArticleOfTheMonth />
        <AddArticle />
      </div>
      <div className='w-4/5 mx-auto flex flex-row'>
        <ArticleList title='Latest articles' />
        <ArticleList title='Recommended rticles' />
      </div>
    </div>
  );
}

export default App;
