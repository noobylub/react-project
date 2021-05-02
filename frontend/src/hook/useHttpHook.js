import react, { useCallback, useRef, useState, useEffect } from "react";

const useHttpHook = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendBackEnd = useCallback(
    async (url, signal, headers = {}, method = "GET", body = null) => {
      try {
        setLoading(true);
        console.log("starting");
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal,
        });

        const data = await response.json();
        if (!response.ok) {
          console.log("something wrong")
          throw new Error(data.message);
        }
        console.log("sucess");
        setLoading(false);

        return data;
      } catch (err) {
        console.log("error in the hooker");
        setError(`${err}`);
        console.log(err)
        setLoading(false);
      }
    }
  );
  const clearError = () => {
    setError("");
  };

  return { error, loading, sendBackEnd, clearError };
};
export default useHttpHook;
