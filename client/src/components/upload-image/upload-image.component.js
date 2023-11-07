import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMutation from "../../components/hooks/useMutation.component";
import useQuery from "../../components/hooks/useQuery.component";

const validFileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UploadImage = () => {
  // use useMutation hook to access axios and the states
  // destructure the mutate function, rename mutate to uploadImage...
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation("http://localhost:5001/api/image");

  const {
    data: imageUrl = [],
    isLoading: imageLoading,
    error: fetchError,
  } = useQuery("http://localhost:5001/api/show/image");

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

    // need formdata to send it to back end = key/value
    const form = new FormData();
    form.append("image", file);
    console.log("this is form: 4 types");
    console.log([...form]);
    console.log(...form);
    console.log(form);
    console.log(typeof form);
    await uploadImage(form);

    // toast notification
    toast.success("Successfully added image!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <>
      <div>aws s3 upload</div>
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
    </>
  );
};

export default UploadImage;
