import { configureStore } from '@reduxjs/toolkit';
import todos from '../modules/todosSlice';

const store = configureStore({
  reducer: {
    todos,
  },
});

export default store;
