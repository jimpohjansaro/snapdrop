import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg bg-white shadow-md">
        {/* Kortin yläosa */}
        <div className="rounded-t-lg bg-blue-300 p-4 text-white">
          <h3 className="text-xl font-semibold">{item.title}</h3>
        </div>

        {/* Kortin sisältö */}
        <div className="p-4">
          <p className="mb-2 pl-1">
            {(() => {
              const now = new Date();
              const created = new Date(item.created_at);
              const diffMs = now.getTime() - created.getTime();
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              const diffDays = Math.floor(diffHours / 24);

              if (diffDays >= 1) {
                return `${diffDays} days ago`;
              } else {
                return `${diffHours}h ago`;
              }
            })()}
          </p>

          {/* Kuva tai video */}
          {item.media_type.includes('image') ? (
            <img
              src={item.filename}
              alt={item.title}
              className="mb-4 h-auto max-h-[400px] w-full rounded object-contain"
            />
          ) : (
            <video
              src={item.filename}
              controls
              className="mb-4 h-auto max-h-[400px] w-full rounded object-contain"
            />
          )}

          {/* Likes-komponentti: sydänikoni ja tykkäysten määrä */}
          <Likes item={item} />

          {/* Kuvaus */}
          <p className="mt-3 text-gray-800">
            <b>{item.username} </b>
            {item.description}
          </p>

          {/* Lisätiedot */}
          <ul className="mt-4 space-y-1 text-gray-700">
            <li>
              <span className="font-semibold">Type:</span> {item.media_type}
            </li>
            <li>
              <span className="font-semibold">Size:</span>{' '}
              {Math.round(item.filesize / 1024)} kB
            </li>
          </ul>
        </div>

        {/* Kortin alatunniste */}
        <div className="flex justify-end rounded-b-lg bg-gray-100 p-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Palaa takaisin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Single;
