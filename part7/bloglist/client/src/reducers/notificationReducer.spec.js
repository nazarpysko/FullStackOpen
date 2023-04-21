import deepfreze from 'deep-freeze';
import notificationReducer from './notificationReducer';

describe('notification reducer', () => {
  const initialState = '';

  test('should set message as notification', () => {
    const message = 'notification message';
    const action = {
      type: 'SET',
      message,
    };
    const state = initialState;

    deepfreze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(message);
  });

  test('should clear notification message', () => {
    const action = {
      type: 'CLEAR',
    };
    const state = initialState;

    deepfreze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual('');
  });
});
