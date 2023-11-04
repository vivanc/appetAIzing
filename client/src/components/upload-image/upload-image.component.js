import { useState } from "react";
import UseMutation from "../../components/hooks/useMutation.component";

const validFileTypes = ["image/png", "image/jpg", "image/jpeg"];

const UploadImage = () => {
  // use useMutation hook to access axios and the states
  //destructure the mutate function, rename mutate to uploadImage...
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = UseMutation("http://localhost:5001/api/images");

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

    // need formdata to send it to back end = key/values
    const form = new FormData();
    form.append("image", file);
    console.log("this is form:");
    console.log(form);
    await uploadImage(form);
  };

  return (
    <>
      <div>aws s3 upload</div>
      <input id="upload-btn" type="file" hidden onChange={handleUpload} />
      <label htmlFor="upload-btn" className="btn btn-warning">
        Upload
      </label>
      <div className="text-danger">{error && `${error}`}</div>
      <div className="text-danger">{uploadError && `${uploadError}`}</div>
    </>
  );
};

export default UploadImage;
