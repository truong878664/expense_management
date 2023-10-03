import { createSlice } from "@reduxjs/toolkit";


export interface InitialState {
    value: number;
    content?: number;
}

const initialState: InitialState = {
    value: 0,
    content: 2,
};
const actions = {
    increment(state: InitialState) {
        state.value += 1;
    },
    decrement(state: InitialState) {
        state.value -= 1;
    },
    incrementByAmount(state: InitialState, action: { payload: InitialState }) {
        state.value += action.payload.value;
    },
};
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: actions,
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
