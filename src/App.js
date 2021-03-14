import {
  Route,
  Switch,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useAuth } from "./context/auth-context";

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
  return <h1>Public Page</h1>;
}

function ProtectedPage() {
  return <h1>Protected Page</h1>;
}

export default App;
