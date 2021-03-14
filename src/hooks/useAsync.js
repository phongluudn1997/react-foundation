import * as React from "react";

function useAsync(asyncFunction, immediate = true) {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  const execute = React.useCallback(() => {
    setStatus("pending");
    setData(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setData(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const isLoading = status === "pending";
  const isError = status === "error";
  const isIdle = status === "idle";
  const isSuccess = status === "success";

  return {
    execute,
    data,
    status,
    error,
    isSuccess,
    isLoading,
    isError,
    isIdle,
  };
}

export { useAsync };
