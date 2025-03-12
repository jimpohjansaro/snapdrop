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
    <div className="border-darkgrey flex flex-row items-center gap-4 rounded-md border-2 px-10 py-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h4>Current Rating: </h4>
        <Rating
          style={{maxWidth: 150}}
          value={averageRating}
          readOnly
          itemStyles={{
            itemShapes: Star,
            activeFillColor: '#38a2bc',
            inactiveFillColor: '#a8b3c5',
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h4>Rate this media: </h4>
        <Rating
          style={{maxWidth: 150}}
          value={userRating}
          onChange={(newRating: number) => setUserRating(newRating)}
          itemStyles={{
            itemShapes: Star,
            activeFillColor: '#38a2bc',
            inactiveFillColor: '#a8b3c5',
          }}
        />
        <button className="bg-red-700 p-4" onClick={handleSubmitRating}>
          Submit rating
        </button>
      </div>
    </div>
  );
};

export {Ratings};
