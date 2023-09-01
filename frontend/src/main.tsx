import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // New line
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import auth0config from "./auth0config.json"; // Adjust the path based on your directory structure

// 1. Import `extendTheme for Chakra Custom Theme Styles`
import { extendTheme } from "@chakra-ui/react";

// 2. Calling `extendTheme` to pass custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#8764FF",
      200: "#9583F433",
    },
    white: "#FFF",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain={auth0config.domain}
        clientId={auth0config.clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://" + auth0config.domain + "/api/v2/",
          scope: auth0config.scope,
        }}
      >
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
