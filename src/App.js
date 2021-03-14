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
import { useAsync } from "./hooks/useAsync";
import { client } from "./api-client/index";

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
        console.log("USER", user);
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
      Welcome! <button onClick={() => logout()}>Log out</button>
    </div>
  ) : (
    "You are not logged in"
  );
}

function LoginPage(props) {
  const location = useLocation();
  const history = useHistory();
  const auth = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };
  console.log({ location, history });
  return (
    <div>
      <button onClick={() => auth.login(() => history.replace(from))}>
        Login
      </button>
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
  } = useAsync(client("/posts"));

  if (isSuccess) {
    console.log(data);
    debugger;
  }

  return (
    <>
      <h1>Public Page</h1>
      <button onClick={execute}>Click me</button>
      {isIdle && "Click button to fetch API"}
      {isLoading && "Loading..."}
      {isError && error.message}
    </>
  );
}

function ProtectedPage() {
  return <h1>Protected Page</h1>;
}

export default App;
