import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Comments from "./components/Comment";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import { authenticate } from "./store/session";
import { AboutUs } from "./components/AboutUs/AboutUs";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar setResults={setResults} loaded={loaded} />
      {loaded && (
        <Switch>
          <Route path="/" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route exact path="/comments">
            <Comments></Comments>
          </Route>
          <Route exact path="/search">
            <Search results={results}></Search>
          </Route>

          <ProtectedRoute path="/users/:username" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/feed" exact={true}>
            <Home></Home>
          </ProtectedRoute>
          <ProtectedRoute path="/about-us" exact={true}>
            <AboutUs />
          </ProtectedRoute>
          <ProtectedRoute>
            <FAQ />
          </ProtectedRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      )}
      {user && <Footer />}
    </>
  );
}

export default App;
