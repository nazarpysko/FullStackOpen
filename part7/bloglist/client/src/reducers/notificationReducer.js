const initialState = ''

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

export const setNotificationMessage = message => {
  return {
    type: 'SET',
    message,
  };
};

export const clearNotificationMessage = () => {
  return {
    type: 'CLEAR',
  };
};

export const showNotification = message => {
  setNotificationMessage(message);
  setTimeout(clearNotificationMessage(), 3000);
};

export default notificationReducer;
