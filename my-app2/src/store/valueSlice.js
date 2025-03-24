import { createSlice } from "@reduxjs/toolkit";

const hasOperatorBetween = (str) => {
  return /[0-9]+\s*[\+\-\*\/]\s*[0-9]+/.test(str);
};

const valueSlice = createSlice({
  name: "value",
  initialState: { value: "Default Value", history: "" }, // Initial stored value
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload; // Replace value with new one
    },
    appendText: (state, action) => {
      if (hasOperatorBetween(state.history)) {
        console.log("Operatorch", hasOperatorBetween(state.history))
        console.log('history8', state.history)
        state.history = state.history + " " + action.payload + "\n"; // Append new text
      } else {
        console.log("Operatorch", hasOperatorBetween(state.history))
        console.log('history9', state.history)
        state.history = state.history + " " + action.payload;
      }
    },
    resetHistory: (state) => {
      state.history = ""; // Clear history without affecting value
      state.value = "";
    },
  },
});

export const { updateValue, appendText, resetHistory } = valueSlice.actions;
export default valueSlice.reducer;