import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const login = createAsyncThunk('user/login', async ({ email, pass }) => {

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;

        const userData = {
            token: token,
            user: user
        };

        return userData;
    } catch (error) {
        console.log("userSlice line 19: ", error);
        throw error;
    }
    
})
    

const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null
};  

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
        setEmail: (state, action) => {
            const lowercaseEmail = action.payload.toLowerCase();
            state.email = lowercaseEmail
        },
        setPass: (state, action) => {
            state.pass = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;

            })
            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                state.isLoading = false;
                state.error = action.error.message;

            });
        }

})


export const { setEmail, setPass, setIsLoading} = userSlice.actions;
export default userSlice.reducer;