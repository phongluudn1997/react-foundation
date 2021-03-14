import * as React from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  // Call HTTP request to fetch user, then set state here
  const [user, setUser] = React.useState(null);

  const login = (cb) => {
    setUser("user");
    cb();
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value} {...props} />;
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

export { AuthProvider, useAuth };
