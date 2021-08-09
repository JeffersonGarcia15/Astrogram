import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignUpForm/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Profile from './components/Profile'
import Home from './components/Home'
import Comments from './components/Comment'
import Footer from './components/Footer'
import Search from './components/Search'
import NotFound from './components/NotFound'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [results, setResults] = useState([]);

  useEffect(() => {
    (async() => {
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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path='/comments'>
          <Comments></Comments>
        </Route>
        <Route exact path='/search'>
          <Search results={results}></Search>
        </Route>
        {/* <Route exact path='/users/:name'>
          <Profile />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:username' exact={true} >
            <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Home></Home>
        </ProtectedRoute>
        <Route path='*'>
          <NotFound></NotFound>
        </Route>
      </Switch>

      )}
      <Footer />
    </>
  );
}

export default App;
