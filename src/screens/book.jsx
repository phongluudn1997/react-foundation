import * as React from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";

function Book() {
  const { _id } = useParams();
  const { data: book, isLoading, isSuccess, execute } = useAsync();
  console.log(book?.data.book._id);

  React.useEffect(() => {
    execute(client(`/books/${_id}`));
  }, [_id, execute]);

  if (isLoading) {
    return "...Loading";
  }

  if (isSuccess) {
    return <div></div>;
  }
}

export { Book };
