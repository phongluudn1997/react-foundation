import * as React from "react";
import { Input, Spinner } from "@chakra-ui/react";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";
import { Link } from "react-router-dom";

function Discover() {
  const { data, isLoading, isError, error, execute, isSuccess } = useAsync();
  const [query, setQuery] = React.useState("");
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      execute(client("/books/discover"));
    } else {
      execute(client(`/books?search=${query}`));
    }
  }, [execute, query]);

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
  };

  console.log(data);

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input name="search" placeholder="Search books..." />
        </form>
        {isError ? (
          <div>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {isLoading ? <Spinner /> : null}
        {isSuccess ? (
          data.data.books.length ? (
            <ul className="space-y-4">
              {data.data.books.map((book) => (
                <li key={book._id}>
                  <BookRow book={book} />
                </li>
              ))}
            </ul>
          ) : (
            "No books"
          )
        ) : null}
      </div>
    </div>
  );
}

function BookRow({ book }) {
  const { title, author, coverImageUrl, publisher, synopsis } = book;

  return (
    <div className="flex items-center justify-end">
      <Link
        className="grid gap-5 border border-gray-200 rounded-sm p-5"
        style={{ gridTemplateColumns: "140px 1fr" }}
      >
        <div>
          <img src={coverImageUrl} alt="Book" />
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex-1">
              <h2>{title}</h2>
            </div>
            <div className="ml-2">
              <div className="italic text-sm">{author}</div>
              <small>{publisher}</small>
            </div>
          </div>
          <small className="break-words">{synopsis.substring(0, 500)}...</small>
        </div>
      </Link>
      <div>
        <StatusButton />
      </div>
    </div>
  );
}

function StatusButton() {
  return <div></div>;
}

export { Discover };
