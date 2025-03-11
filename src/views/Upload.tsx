import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
//import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // redirect to Home if you want
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    // use fileRef to clear file input field after upload
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h2 className="mt-2 self-center sm:mt-4">Upload</h2>
        <form
          className="flex w-2/3 flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-4/5 flex-col">
            <label htmlFor="title">Title</label>
            <input
              className="my-2.5 rounded-md border p-2.5"
              name="title"
              type="text"
              id="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </div>
          <div className="flex w-4/5 flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="my-2.5 rounded-md border p-2.5"
              name="description"
              rows={5}
              id="description"
              onChange={handleInputChange}
              value={inputs.description}
            ></textarea>
          </div>
          <div className="flex w-4/5 flex-col">
            <label htmlFor="file">File</label>
            <input
              className="my-2.5 rounded-md border file:mr-2.5 file:bg-blue-600 file:p-2.5"
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              // reference for useRef hook
              ref={fileRef}
            />
          </div>
          {file?.type.includes('video') ? (
            <video
              controls
              className="radius-2 mx-2.5 my-0 h-64 w-96 object-cover"
              src={file ? URL.createObjectURL(file) : ''}
            ></video>
          ) : (
            <img
              className="radius-2 mx-2.5 my-0 h-64 w-96 object-cover"
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://place-hold.it/384?text=Choose+image+or+video'
              }
              alt="preview"
              width="200"
            />
          )}
          <button
            className="my-2.5 block w-4/5 rounded-md bg-blue-400 p-2 text-center transition-all duration-500 ease-in-out hover:bg-blue-600"
            type="submit"
            disabled={
              file && inputs.title.length > 3 && inputs.description.length > 0
                ? false
                : true
            }
          >
            {uploading ? 'Uploading..' : 'Upload'}
          </button>
          <button
            className="my-2.5 block w-4/5 rounded-md bg-amber-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-amber-700"
            onClick={resetForm}
          >
            Reset
          </button>
          <p>{uploadResult}</p>
        </form>
      </div>
    </>
  );
};

export default Upload;
