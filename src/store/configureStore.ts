import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import loggerMiddleware from './middlewares/logger'
import {rootReducer} from './reducers'
import createSagaMiddleware from 'redux-saga'

export default function configureAppStore(preloadedState: {}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = {
    ...configureStore({
      reducer: rootReducer,
      middleware: [loggerMiddleware, sagaMiddleware, ...getDefaultMiddleware()],
      preloadedState,
    }),
    runSaga: sagaMiddleware.run,
  };

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  // sagaMiddleware.run(rootSaga);

  return store
}
