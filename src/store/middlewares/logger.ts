import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';

const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result
};

export default logger
