import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/Modal";
import { getClientId } from "./utils/getClientId";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore();

function Root() {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchClientId = async () => {
      const id = await getClientId();
      setClientId(id);
    };
    fetchClientId();
  }, []);

  if (!clientId) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="component">
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <GoogleOAuthProvider clientId={clientId}>
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
