import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search_param',
    initialState: {
        value: 0
    },
    // Listen to state change event
    reducers: {
        increment: state => { // Pass the state variable in when calling the state updater function
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        resetCounter: state => {
            state.value =0
        },
        doubleCounter: state => {
            state.value *= 2
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, resetCounter, doubleCounter } = searchSlice.actions

export default searchSlice.reducer