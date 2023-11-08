import axios from "axios";
import { useState, useEffect } from "react";

// custom hook to handle fetch image from s3
const useQuery = (url) => {
  // , refetch
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(url)
        .then(({ data }) => setState({ data, isLoading: false, error: "" }))
        .catch((error) =>
          setState({ data: null, isLoading: false, error: error.message })
        );
    };
    fetch();
  }, [url]);
  // , refetch

  return state;
};

export default useQuery;
