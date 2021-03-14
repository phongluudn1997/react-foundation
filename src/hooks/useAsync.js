import * as React from "react";

function useAsync(asyncFunction) {
  const [value, setValue] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  const execute = () => {
    setStatus("pending");
    setValue(null);
    setError(null);

    asyncFunction
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        setError(error);
      });
  };

  return { execute, value, status, error };
}

export { useAsync };
