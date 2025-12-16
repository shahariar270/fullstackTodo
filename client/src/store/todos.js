import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoute } from '../Ultis/helper';

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${apiRoute}/todos`);
            return res.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default todoSlice.reducer;
