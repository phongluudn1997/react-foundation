import * as React from "react";

function useAsync(asyncFunction) {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  const execute = () => {
    setStatus("pending");
    setData(null);
    setError(null);

    asyncFunction
      .then((response) => {
        setData(response);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        setError(error);
      });
  };

  const isLoading = status === "pending";
  const isError = status === "error";
  const isIdle = status === "idle";

  return { execute, data, status, error, isLoading, isError, isIdle };
}

export { useAsync };
