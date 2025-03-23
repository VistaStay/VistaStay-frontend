import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { query: "" },
  reducers: {
    submit: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { submit } = searchSlice.actions;
export default searchSlice.reducer; 
