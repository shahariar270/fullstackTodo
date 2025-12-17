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

export const createTodos = createAsyncThunk(
    'todo/createTodos',
    async (formData, thunkAPI) => {
        try {
            const res = await axios.post(`${apiRoute}/todos`, formData)
            return res.data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async ({ id, formData }, thunkAPI) => {
        console.log(formData);
        try {
            const res = await axios.put(`${apiRoute}/todos/${id}`, formData)
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


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
            })
            //create todos
            .addCase(createTodos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = [action.payload, ...state.todos];
            })
            .addCase(createTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //update todo
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload.id
                );

                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            });

    },
});

export default todoSlice.reducer;
