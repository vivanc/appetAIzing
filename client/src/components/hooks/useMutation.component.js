// custom hook to put image on s3

import { useState } from "react";
import axios from "axios";

const useMutation = (url) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
  });

  const fn = async (form) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    axios
      .post(url, form)
      .then((res) => {
        console.log(res);
        setState({ isLoading: false, error: "" });
      })
      .catch((error) => {
        console.log(error);
        setState({ isLoading: false, error: error.message });
      });
  };
  // named fn as mutate
  // spread state, anytime we call this hook, it will return fn, and it will run axios, and you will have access to the state
  return { mutate: fn, ...state };
};

export default useMutation;
