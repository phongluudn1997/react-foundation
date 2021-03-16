import * as React from "react";
import { Input, Spinner } from "@chakra-ui/react";
import { useAsync } from "utils/hooks";

function Discover() {
  const {
    data: books,
    isLoading,
    isError,
    error,
    execute,
    isSuccess,
  } = useAsync();
  const [query, setQuery] = React.useState("");
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (!firstRender.current) {
    }
  }, [execute, query]);

  React.useEffect(() => {
    firstRender.current = false;
  }, []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
  };

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
          books.length ? (
            <ul>
              books.map(book => <li>Book</li>)
            </ul>
          ) : null
        ) : null}
      </div>
    </div>
  );
}

export { Discover };
