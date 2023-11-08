import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMutation from "../../components/hooks/useMutation.component";
import useQuery from "../../components/hooks/useQuery.component";

const validFileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UploadImage = () => {
  // for auto-refetch whenever the image is attached
  const [refetch, setRefetch] = useState(0);

  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation("http://localhost:5001/api/image");

  const {
    data: imageUrl = [],
    isLoading: imageLoading,
    error: fetchError,
  } = useQuery("http://localhost:5001/api/show/image", refetch);

  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    // grab file
    const file = e.target.files[0];
    console.log(e.target.files[0]);

    // check file type
    if (!validFileTypes.find((type) => type === file.type)) {
      setError("File must be in JPG/PNG format");
      return;
    }

    // need FormData to send it to back end = key(file name)/value(file itself)
    const form = new FormData();
    form.append("image", file);
    console.log(...form);
    await uploadImage(form);

    // set timeout for refetch 1sec
    setTimeout(() => {
      setRefetch((s) => s + 1);
    }, 1000);

    // toast notification
    toast.success("Successfully added image!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <>
      <input id="upload-btn" type="file" hidden onChange={handleUpload} />
      <ToastContainer />
      <label htmlFor="upload-btn" className="btn btn-warning">
        Upload
      </label>
      <div className="text-danger">{error && `${error}`}</div>
      <div className="text-danger">{uploadError && `${uploadError}`}</div>
      <br />
      <div>Display</div>
      <div className="text-danger">{fetchError && `${fetchError}`}</div>
      <div className="text-muted">
        {!fetchError && imageUrl?.length === 0 && `No images found`}
      </div>
      <div>
        {imageUrl?.length > 0 &&
          imageUrl.map((iurl) => (
            <img src={iurl} alt="uploaded image" key={iurl} />
          ))}
      </div>
    </>
  );
};

export default UploadImage;
