import { createSlice } from "@reduxjs/toolkit";

const hasOperatorBetween = (str) => {
  return /[0-9]+\s*[\+\-\*\/]\s*[0-9]+/.test(str);
};

const valueSlice = createSlice({
  name: "value",
  initialState: { value: "", history: [], memory: ""}, // Initial stored value
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload; // Replace value with new one
    },
    appendText: (state, action) => {
      if (hasOperatorBetween(state.history)) {
        state.history = [...(Array.isArray(state.history) ? state.history : []), action.payload]; // Append new text
      } else {

        state.history = [...(Array.isArray(state.history) ? state.history : []), action.payload];;
      }
    },
    appendMemoryplus: (state, action) => {
      state.memory = Number(state.memory) + Number(action.payload);
    },
    appendMemoryminus: (state, action) => {
      state.memory = Number(state.memory) - Number(action.payload);
    },
    appendMemorysupply:(state, action)=> {
      state.memory = [...action.payload];
    },
    deleteMemory: (state, action) => {
      state.memory = "";
    },
    resetHistory: (state) => {
      state.history = []; // Clear history without affecting value
      state.value = "";
    },
  },
});

export const { updateValue, appendText, appendMemoryplus, resetHistory, deleteMemory, appendMemoryminus, appendMemorysupply } = valueSlice.actions;
export default valueSlice.reducer;