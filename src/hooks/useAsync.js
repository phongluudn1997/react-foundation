import * as React from "react";

function useAsync(asyncFunction) {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useReducer();

  const execute = () => {
    setStatus("pending");
    setData(null);
    setError(null);

    asyncFunction()
      .then((response) => {
        setData(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  };

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
