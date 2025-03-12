import type {
  MediaItemWithOwner,
  Rating as RatingType,
} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {Rating, Star} from '@smastrom/react-rating';
import {useRating} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

const Ratings = ({item}: {item: MediaItemWithOwner}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState<number>(0);
  const {postRating, getRatingByMediaId, getRatingListByMediaId} = useRating();
  const {user} = useUserContext();

  const fetchAverageRating = async () => {
    try {
      const data = await getRatingByMediaId(item.media_id);
      console.log('Average Rating: ', data);
      setAverageRating(data.average);
    } catch (err) {
      console.error("Couldn't get average rating", (err as Error).message);
    }
  };

  const fetchUserRating = async () => {
    if (!user?.user_id) return;
    try {
      const ratingList = await getRatingListByMediaId(item.media_id);
      const foundRating = ratingList.find(
        (rating: RatingType) => rating.user_id === user.user_id,
      );
      console.log('User rating: ', foundRating);
      setUserRating(foundRating?.rating_value ?? 0);
    } catch (err) {
      console.error("Couldn't get user rating", (err as Error).message);
    }
  };

  const handleSubmitRating = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token missing');
      return;
    }

    console.log("User's rating: ", userRating);
    try {
      const response = await postRating(item.media_id, userRating, token);
      console.log('Rating response: ', response);
      fetchAverageRating();
    } catch (err) {
      console.error('Error submitting rating', (err as Error).message);
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, [item.media_id]);

  useEffect(() => {
    if (user?.user_id) {
      fetchUserRating();
    }
  }, [item.media_id, user?.user_id]);

  return (
    <div className="border-darkgrey flex flex-col items-start pt-4">
      <p className="pb-4 font-semibold">Ratings:</p>
      <div className="flex flex-row items-center justify-center gap-4 text-gray-700">
        <p className="font-semibold">Current Rating:</p>
        <Rating
          style={{maxWidth: 150}}
          value={averageRating}
          readOnly
          itemStyles={{
            itemShapes: Star,
            activeFillColor: 'yellow',
            inactiveFillColor: '#ccc',
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-2 text-gray-700">
        <p className="font-semibold">Rate this media:</p>
        <Rating
          style={{maxWidth: 150}}
          value={userRating}
          onChange={(newRating: number) => setUserRating(newRating)}
          itemStyles={{
            itemShapes: Star,
            activeFillColor: 'yellow',
            inactiveFillColor: '#ccc',
            activeBoxBorderColor: 'red',
            inactiveBoxBorderColor: 'blue',
          }}
        />
        <button
          className="ml-2 rounded-full border-2 border-blue-600 bg-blue-500 p-2 text-black hover:bg-blue-700"
          onClick={handleSubmitRating}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export {Ratings};
