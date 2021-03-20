import * as React from "react";
import {
  Route,
  Switch,
  Link,
  Redirect,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";
import { Discover } from "screens/discover";
import { Book } from "screens/book";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageErrorFallback, FormGroup, Input } from "components/lib";
import { Modal, ModalContent, ModalOpenButton } from "components/modal";

function App() {
  return (
    <>
      <div className="flex items-center gap-2 absolute top-5 right-5">
        <AuthButton />
      </div>
      <div
        className="w-full max-w-4xl grid gap-2 my-0 mx-auto py-4 px-2"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <Nav />
        <main>
          <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}

function AuthButton() {
  const { user, login, logout } = useAuth();

  const { data, error, isLoading, execute } = useAsync();

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    execute(
      login({ email: email.value, password: password.value }, () => {
        console.log("Logined");
      })
    );
  };

  return user ? (
    <>
      <div>{user.email}</div>
      <button className="p-2 bg-gray-100 rounded-sm" onClick={logout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Modal>
        <ModalOpenButton>
          <button className="p-2 bg-gray-100 rounded-sm">Login</button>
        </ModalOpenButton>
        <ModalContent>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <FormGroup>
              <label>Email</label>
              <Input type="text" name="email" />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <Input type="password" name="password" />
            </FormGroup>
            <button
              className="self-end px-3 py-2 bg-indigo-700 text-white rounded-md"
              type="submit"
            >
              Submit
              {isLoading ? "..." : null}
            </button>
          </form>
          {error ? <pre>{error.message}</pre> : null}
        </ModalContent>
      </Modal>
    </>
  );
}

function Nav() {
  return (
    <nav className="sticky border-gray-900 rounded-sm px-2 py-4">
      <ul>
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finised Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function NavLink(props) {
  const match = useRouteMatch(props.to);
  const matchCSS = "bg-gray-200";
  return (
    <Link
      className={`block px-2 pt-4 pb-2 my-1 mx-0 w-full h-full rounded-sm hover:text-indigo-400 hover:bg-gray-200 ${
        match ? matchCSS : ""
      }`}
      style={{ borderLeft: "5px solid transparent" }}
      {...props}
    />
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/public">
        <PublicPage />
      </Route>
      <PrivateRoute path="/protected">
        <ProtectedPage />
      </PrivateRoute>
      <Route path="/discover">
        <Discover />
      </Route>
      <Route path="/books/:_id">
        <Book />
      </Route>
    </Switch>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
}

function LoginPage(props) {
  const { isLoading, isError, error, execute } = useAsync();
  const location = useLocation();
  const history = useHistory();
  const auth = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };
  console.log({ location, history });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    execute(
      auth.login(
        {
          email: email.value,
          password: password.value,
        },
        () => history.replace(from)
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {isError && (
        <div>
          <pre>{error.message}</pre>
        </div>
      )}
    </div>
  );
}

function PublicPage() {
  const {
    execute,
    data,
    error,
    isLoading,
    isError,
    isIdle,
    isSuccess,
  } = useAsync();

  React.useEffect(() => {
    execute(client("/posts"));
  }, [execute]);

  return (
    <>
      <h1>Public Page</h1>
      <button onClick={() => execute(client("/posts"))}>Click me</button>
      {isIdle && "Click button to fetch API"}
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess && (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProtectedPage() {
  return <h1>Protected Page</h1>;
}

export default App;
