import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
// import cartReducer from './reducers/cartReducer';
import localStorage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage: localStorage,
//   whitelist: ['auth', 'cart'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
//   cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    //   {
    //     ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    //   },
    }),
});

export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
