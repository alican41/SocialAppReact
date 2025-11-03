import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  pass: null,
  isLoading: false,
  isAuth: false
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
    }

})


export const { setEmail, setPass, setIsLoading} = userSlice.actions;
export default userSlice.reducer;