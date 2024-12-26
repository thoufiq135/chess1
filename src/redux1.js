import { configureStore } from '@reduxjs/toolkit';
import ChessReducer from './slice1';

const store = configureStore({
  reducer: {
    chess:ChessReducer
  },
})
export {store};
