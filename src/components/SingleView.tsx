import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import Likes from '../components/Likes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open className="p-4">
      {item && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedItem(undefined)}
            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Close
          </button>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-600">
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          {item.media_type.includes('image') ? (
            <img
              src={item.filename}
              alt={item.title}
              className="max-h-[400px] w-full rounded object-cover"
            />
          ) : (
            <video
              src={item.filename}
              controls
              className="max-h-[400px] w-full rounded object-cover"
            />
          )}
          <p className="text-gray-800">{item.description}</p>
          {/* Likes-komponentti, joka näyttää sydänikonin ja tykkäysten määrän */}
          <Likes item={item} />
        </div>
      )}
    </dialog>
  );
};

export default SingleView;
