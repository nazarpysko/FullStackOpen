const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.message;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

const setNotificationMessage = message => {
  return {
    type: 'SET',
    message,
  };
};

const clearNotificationMessage = () => {
  return {
    type: 'CLEAR',
  };
};

export const showNotification = message => {
  return async dispatch => {
    dispatch(setNotificationMessage(message));
    setTimeout(() => dispatch(clearNotificationMessage()), 3000);
  };
};

export default notificationReducer;
