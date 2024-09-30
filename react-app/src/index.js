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

function Root() {
  return (
    <>
      <div className="component">
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <GoogleOAuthProvider clientId="60469361499-a3opbb8lsiqp1h4b4p68nfksn125lqaa.apps.googleusercontent.com">
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
