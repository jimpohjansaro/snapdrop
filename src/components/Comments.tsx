import {useCommentsStore} from '../store';
import {useComments} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useForm} from '../hooks/formHooks';
import {useEffect, useRef} from 'react';

export const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const user = useUserContext();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {comments, setComments} = useCommentsStore();
  const {postComment, getCommentsByMediaId} = useComments();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("User's token not found.");
      return;
    }

    await postComment(inputs.comment_text, item.media_id, token);
    getComments();
    setInputs(initValues);
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      console.log('Comments: ', comments);
      setComments(comments);
    } catch (err) {
      setComments([]);
      console.error((err as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  useEffect(() => {
    getComments();
  }, []);

  const itemOwner = item.username as string;

  return (
    <div className="mx-auto w-full rounded-lg">
      <p className="my-4 text-left font-semibold">Comments:</p>
      <div className="flex max-h-[30vh] flex-col overflow-y-auto md:max-h-[70vh]">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-2 py-2 pl-2 last:border-none">
              <p className="font-semibold text-black">@{comment.username} </p>
              <p>{comment.comment_text}</p>
            </div>
          ))
        ) : (
          <p>No comments here!</p>
        )}
      </div>
      {user && (
        <form className="mt-4 flex items-center gap-3" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="flex w-full resize-none items-center overflow-hidden rounded-full border px-4 pt-4"
            name="comment_text"
            placeholder={`Add your comment to user ${itemOwner}`}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <button
            className="cursor-pointer rounded-full border-2 border-blue-600 bg-blue-500 p-4 hover:bg-blue-600"
            type="submit"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};
