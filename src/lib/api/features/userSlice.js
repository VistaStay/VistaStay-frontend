import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{name : "sharada"},
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            console.log(action);
            state.user = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;