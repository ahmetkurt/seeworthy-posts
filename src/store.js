import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postsReducers from './slices/PostsSlice';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  combineReducers({
    posts: postsReducers,
  })
);

export const mainStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(mainStore);

export default { mainStore, persistor };
