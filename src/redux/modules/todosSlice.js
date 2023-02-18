import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//비동기 함수를 호출하는 부분이 createAsyncThunk API를 콜 하면서 만들 수 있따.

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};
//비동기 함수를 호출하는 부분이 createAsyncThunk API를 콜 하면서 만들 수 있따.
//Thunk함수는 앞에 __를 준다
//createAsyncThunk함수는 두 개의 인자를 갖는다. 문자열(이름) 과 함수를 갖는다
//함수의 첫번째 인자는 payload(컴포넌트에서 주는 payload값을 그대로 가지고있다,)
// 두번째 인자는 thunk와 관련된 기능을 가지고 있는 thunk Api
export const __getTodos = createAsyncThunk('getTodos', async (payload, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:4001/todos');
    return thunkAPI.fulfillWithValue(response.data);
    console.log('response: ', response);
  } catch (error) {
    console.log('error', error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducer: {},
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      //아직 진행중일때
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      console.log('fulfilled :', action);
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
