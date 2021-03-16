import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";
import { ChakraProvider } from "@chakra-ui/react";

function AppProviders({ children }) {
  return (
    <Router>
      <ChakraProvider>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export { AppProviders };
