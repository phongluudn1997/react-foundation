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

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 2fr" }}>
      <img src={book.coverImageUrl} alt="book cover" />

      <div>
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <div>
              <i>{book.author}</i>
              <span className="mx-2">|</span>
              <i>{book.publisher}</i>
            </div>
          </div>
        </div>
        <br />
        <p>{book.synopsis}</p>
      </div>
    </div>
  );
}

export { Book };
