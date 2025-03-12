import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useMedia} from '../hooks/apiHooks';
import {MediaItem} from 'hybrid-types/DBTypes';
import {useLocation} from 'react-router';

const Modify = () => {
  const {state} = useLocation();
  const item: MediaItem = state.item;
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');

  const {modifyMedia} = useMedia();

  const initValues = {
    title: item.title,
    description: item.description || '',
  };

  const doUpload = async () => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No file selected');
      }
      await modifyMedia(item.media_id, inputs, token);
      setUploadResult('Upload successful');
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      {uploadResult ? (
        <>
          <h1>{uploadResult}</h1>
        </>
      ) : (
        <div className="flex flex-col items-center p-4">
          {uploading ? (
            <h1>Uploading...</h1>
          ) : (
            <>
              <div className="flex w-full flex-col items-center">
                <h2 className="mt-2 self-center sm:mt-4">Modify</h2>
                <form
                  className="flex w-2/3 flex-col items-center justify-center"
                  onSubmit={handleSubmit}
                >
                  <div className="flex w-4/5 flex-col">
                    <label htmlFor="title">Title</label>
                    <input
                      name="title"
                      type="text"
                      id="title"
                      onChange={handleInputChange}
                      value={inputs.title}
                      className="my-2.5 rounded-md border p-2.5"
                    />
                  </div>
                  <div className="flex w-4/5 flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      rows={5}
                      id="description"
                      onChange={handleInputChange}
                      value={inputs.description}
                      className="my-2.5 rounded-md border p-2.5"
                    ></textarea>
                  </div>
                  <button
                    className="cursor-pointer rounded-md bg-blue-600 p-2 text-lg"
                    type="submit"
                    onClick={doUpload}
                  >
                    Upload
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Modify;
