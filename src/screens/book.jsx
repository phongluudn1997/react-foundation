import * as React from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";

function Book() {
  const { _id } = useParams();
  const { data, isLoading, isIdle, execute } = useAsync();
  const book = data?.data.book;

  React.useEffect(() => {
    execute(client(`/books/${_id}`));
  }, [_id, execute]);

  if (isLoading || isIdle) {
    return "...Loading";
  }

  return <div></div>;
}

export { Book };
