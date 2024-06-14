import { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

export default function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavorite, removeFavorite } = useActions();
  const { favorites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm mb-2">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.forks}</span>
        </p>
        <p className="text-sm font-thin mb-2">{repo?.description}</p>

        {!isFav && (
          <button
            className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all mr-2"
            onClick={addToFavorite}>
            Add
          </button>
        )}
        {isFav && (
          <button
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={removeFromFavorite}>
            Remove
          </button>
        )}
      </a>
    </div>
  );
}
