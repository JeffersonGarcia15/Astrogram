import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import posts from './post'
import comments from './comment' 
import profile from './profile'
import postLikes from './postlike'
import commentLikes from './commentlike'
import followers from './follow'
import messages from './message'

const rootReducer = combineReducers({
  session,
  posts,
  comments,
  profile,
  postLikes,
  commentLikes,
  followers,
  messages
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
