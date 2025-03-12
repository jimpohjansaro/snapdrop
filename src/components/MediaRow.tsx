import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';
import Likes from '../components/Likes';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  return (
    <article className="flex w-full flex-col rounded-2xl border-2 border-blue-300 bg-blue-100 shadow-md">
      <h4 className="p-4 font-semibold">{item.username}</h4>
      <img
        className="h-72 w-full self-center object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-left">{item.title}</h3>
        <p className="max-w-full overflow-clip font-bold text-nowrap text-ellipsis text-blue-400">
          {item.description}
        </p>
        {/* Likes-komponentti kortin sisällössä */}
        <div className="mt-2">
          <Likes item={item} />
        </div>
        <div className="mt-2 flex h-full w-full flex-col gap-2">
          <Link
            className="block w-full cursor-pointer rounded-2xl bg-blue-400 p-2 text-center transition-all duration-500 ease-in-out hover:bg-blue-600"
            to="/single"
            state={{item}}
          >
            Show
          </Link>
          {/* {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => {
                  console.log('Modify painettu', item.media_id);
                }}
                className="block w-full cursor-pointer rounded-2xl bg-orange-300 p-2 text-center transition-all duration-500 ease-in-out hover:bg-orange-500"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  console.log('Delete painettu', item.media_id);
                }}
                className="block w-full cursor-pointer rounded-2xl bg-red-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )} */}
        </div>
        <p className="text-sm">
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
      </div>
    </article>
  );
};

export default MediaRow;
