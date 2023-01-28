import { configureStore, combineReducers } from '@reduxjs/toolkit'
import getPostSlice from './Slice/getPostsSlice'
import userSlice from '../store/Slice/userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default configureStore({
  reducer: {
    posts: getPostSlice,
    user: userSlice,
  },
})
// const rootReducer = combineReducers({
//   posts: getPostSlice,
//   user: userSlice,
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   // whitelist: ['user.isIn', 'user.isReg'],
//   blacklist: ['user.isIn', 'user.isReg'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// export const persistor = persistStore(store)
// export default store
