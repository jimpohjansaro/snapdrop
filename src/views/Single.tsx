import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import {useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/apiHooks';
//import {Ratings} from '../components/Ratings';
import {Comments} from '../components/Comments';
import {Ratings} from '../components/Ratings';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {user} = useUserContext();
  const {state} = useLocation();
  const {deleteMedia} = useMedia();
  const item: MediaItemWithOwner = state.item;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token missing');
        return;
      }

      console.log('token: ', token);
      console.log('item', item);
      const deleteResponse = await deleteMedia(item.media_id, token);
      console.log('Delete: ', deleteResponse);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg bg-white shadow-md">
        {/* Kortin yläosa */}
        <div className="rounded-t-lg bg-blue-500 p-4 text-white">
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
            <b>@{item.username} </b>
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
          <Ratings item={item} />
          <Comments item={item} />
        </div>

        {/* Kortin alatunniste */}
        <div className="flex justify-end gap-4 rounded-b-lg bg-blue-200 p-4">
          {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => navigate('/modify', {state: {item}})}
                className="block w-full cursor-pointer rounded-2xl bg-orange-300 p-2 text-center transition-all duration-500 ease-in-out hover:bg-orange-500"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  {
                    handleDelete();
                  }
                  console.log('Delete painettu', item.media_id);
                }}
                className="block w-full cursor-pointer rounded-2xl bg-red-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={() => navigate(-1)}
            className="block w-full cursor-pointer rounded-2xl bg-gray-300 p-2 text-center transition-all duration-500 ease-in-out hover:bg-gray-500"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Single;
