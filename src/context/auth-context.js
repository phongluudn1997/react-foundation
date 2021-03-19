import * as React from "react";
import * as auth from "auth-provider";
import { useAsync } from "utils/hooks";
import { client } from "utils/api-client";

const AuthContext = React.createContext();

const bootstrapApp = async () => {
  const token = await auth.getToken();
  const data = await client("/users/bootstrap", { token });
  return data.user;
};

function AuthProvider(props) {
  const {
    data: user,
    setData: setUser,
    status,
    execute,
    isLoading,
    isSuccess,
    isIdle,
    isError,
  } = useAsync();

  React.useEffect(() => {
    execute(bootstrapApp());
  }, [execute]);

  const login = async (form, cb) => {
    const { user } = await auth.login(form);
    setUser(user);
    cb();
    return user;
  };

  const register = (form) => {
    return auth.register(form).then(({ user }) => {
      setUser(user);
    });
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  const value = { user, login, register, logout };

  if (isLoading || isIdle) return <div>Loading...</div>;

  if (isSuccess || isError)
    return <AuthContext.Provider value={value} {...props} />;

  throw Error(`Unhandle with status ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw Error(
      "Component who use useAuth hook should be wrapped in AuthProvider"
    );
  }
  return context;
}

function useClient() {
  const {
    user: { token },
  } = useAuth();
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth };
