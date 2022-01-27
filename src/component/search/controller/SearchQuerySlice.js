import { createSlice } from '@reduxjs/toolkit'

// Global constants
const LEVELS = ["100", "200", "300", "400", "500"];
const CREDITS = ["1", "2", "3", "4", "5", "5+"];
// Took out None, since it's also a utility value (should be mutually exclusive selection)
const CREDIT_TYPES = ["C", "DIV", "I&S", "NW", "QSR", "VLPA", "W"];

function checkValue(currArr, referenceConst, extraAllowedValue=[]) {
    if (currArr.includes("all")) {
        return ["all"];
    } else if (!currArr.every(r => referenceConst.concat(["all"].concat(extraAllowedValue)).includes(r))) {
        return ["all"]; // default to all for malformed query
    }
    return currArr;
}

export const searchSlice = createSlice({
    name: 'search_param',
    initialState: {
        courseName: "all",
        courseLevel: ["all"],
        creditNumber: ["all"],
        creditType: ["all"],
    },
    // Listen to state change event
    reducers: {
        setCourseName: (state, action) => {
            if(action.payload === undefined) {
                state.courseName = "all";
            }  else {
                state.courseName = action.payload.replace(/[^a-zA-Z0-9]/gi, ""); // Only keep alphanumeric characters
            }
        },
        setCourseLevel: (state, action) => {
            state.courseLevel = checkValue(action.payload, LEVELS);
        },
        setCreditNumber: (state, action) => {
            state.creditNumber = checkValue(action.payload, CREDITS);
        },
        setCreditType: (state, action) => {
            state.creditType = checkValue(action.payload, CREDIT_TYPES, ["IS", "None"]);
        }
    }
})

// Action creators are generated for each case reducer function
export const { setCourseName, setCourseLevel, setCreditNumber, setCreditType } = searchSlice.actions

export default searchSlice.reducer