// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER = 'session/UPDATE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})


const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}


export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};




export const signUp = (username, full_name, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      full_name,
      email,
      password,
    }),
  });

  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(setUser(data))
  //   return null;
  // } else if (response.status < 500) {
  //   const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ['An error occurred. Please try again.']
  // }
  const data = await response.json();
  if (data.errors) {
    return data
  }
  dispatch(setUser(data));
  return data
}

export const editProfileUser = (user_id, username, full_name, website, bio, phone, gender, profile_image) => async (dispatch) => {
  const formData = new FormData()

  formData.append('username', username)
  formData.append('full_name', full_name)
  formData.append('website', website)
  formData.append('bio', bio)
  formData.append('phone', phone)
  formData.append('gender', gender)

  if (profile_image) formData.append('image', profile_image)

  const response = await fetch(`/api/users/${user_id}`, {
    method: 'PUT',
    headers: {
      'enctype': 'multipart/form-data'
    },
    body: formData
  })
  const data = await response.json()
  if (data.errors) {
    return data
  }
  dispatch(setUser(data))

}


export default function reducer(state = initialState, action) {
  let updatedState = {...state}
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case UPDATE_USER: {
      updatedState[action.user.id] = action.user
      return updatedState
    }
    default:
      return state;
  }
}
