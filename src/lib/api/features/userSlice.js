import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{name : "sharada"},
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload;
        }
    }
})

export default userSlice.reducer;