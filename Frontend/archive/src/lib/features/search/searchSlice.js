import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    submit: (state, action) => {
      console.log(action);
      
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { submit } = searchSlice.actions;

export default searchSlice.reducer;
