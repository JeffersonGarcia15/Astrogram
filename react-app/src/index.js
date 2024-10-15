import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/Modal";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore();

console.log("Google OAuth Client ID: ", {
  GOOGLE: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  ENV: process.env,
});

function Root() {
  return (
    <>
      <div className="component">
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
              >
                <App />
              </GoogleOAuthProvider>
            </BrowserRouter>
          </ModalProvider>
        </Provider>
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
