import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        await AsyncStorage.setItem('userToken', token);

        return userData;
    } catch (error) {
        console.log("userSlice line 19: ", error);
        throw error;
    }
    
})

// auto login
export const autoLogin = createAsyncThunk('user/autoLogin', async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            return token
        } else {
            throw new Error('User Login Required');
        }
    } catch (error) {
        throw error
    }
})

//logout
export const logout = createAsyncThunk('user/logout', async () => {
    try {
        const auth = getAuth()
        await signOut(auth);
        await AsyncStorage.removeItem('userToken');
        return null
    } catch (error) {
        throw error
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

            })
            .addCase(autoLogin.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isAuth = true;
                state.isLoading = false;
                state.token = action.payload;
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isAuth = false;
                state.isLoading = false;
                state.token = null;
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.isLoading = false;
                state.token = null;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        }

})


export const { setEmail, setPass, setIsLoading} = userSlice.actions;
export default userSlice.reducer;