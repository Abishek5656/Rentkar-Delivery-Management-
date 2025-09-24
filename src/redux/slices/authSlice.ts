// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   token: string | null;
//   role: 'admin' | 'partner' | null;
//   user: { id: string; name: string; email: string } | null;
// }

// const initialState: AuthState = {
//   token: null,
//   role: null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (
//       state,
//       action: PayloadAction<{ token: string; role: 'admin' | 'partner'; user: any }>
//     ) => {
//       state.token = action.payload.token;
//       state.role = action.payload.role;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.role = null;
//       state.user = null;
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'partner';
}

interface AuthState {
  token: string | null;
  role: 'admin' | 'partner' | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  user: null,
  loading: false,
  error: null,
};

// 🔹 Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await login(credentials);
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: { name: string; email: string; password: string; role: 'admin' | 'partner' },
    thunkAPI
  ) => {
    try {
      const res = await register(userData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);



// 🔹 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.user = action.payload;

       localStorage.setItem('token', action.payload.token);
       localStorage.setItem('auth', JSON.stringify(action?.payload));
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

