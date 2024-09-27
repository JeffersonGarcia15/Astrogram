import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/Modal";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import Footer from "./components/Footer";

const store = configureStore();

function Root() {
  return (
    <>
      <div className="component">
        <Provider store={store}>
          <ModalProvider>
            <BrowserRouter>
              <App />
              <Footer />
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
