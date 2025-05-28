import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '../features/blogs/BlogApi';
import authApi from '../features/auth/AuthApi';
import authReducer from '../features/auth/AuthSlice'
import commentApi from '../features/comments/commentApi';

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentApi.middleware),
});

export default store;
