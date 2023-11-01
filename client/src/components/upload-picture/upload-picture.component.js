const UploadPicture = () => {
  // only accept image

  return (
    <div>
      <form onSubmit={""}>
        <input onChange={""} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadPicture;
