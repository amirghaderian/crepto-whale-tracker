import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/searchSlice';
import transactionReducer from '../slices/transactionSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    transactions: transactionReducer,
  },
});
