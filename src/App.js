import * as React from "react";
import {
  Route,
  Switch,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";

function App() {
  return (
    <>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
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
      </Switch>
    </>
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

function AuthButton() {
  const { user, logout } = useAuth();
  return user ? (
    <div>
      Welcome {user.email}! <button onClick={() => logout()}>Log out</button>
    </div>
  ) : (
    "You are not logged in"
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
