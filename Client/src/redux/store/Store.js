import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from '../features/blogs/BlogApi';
import authApi from '../features/auth/AuthApi';
import authReducer from '../features/auth/AuthSlice'
import adminAuthReducer from "../features/auth/AdminAuthSlice";
import commentApi from '../features/comments/CommentApi';
import { contactApi } from '../features/contactUs/ContactUsApi';

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentApi.middleware, contactApi.middleware),
});

export default store;
