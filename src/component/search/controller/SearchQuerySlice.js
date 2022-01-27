import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search_param',
    // This controller only stores state that needs to be shared in both search bar and search result page
    // States that are only used in 1 component will not be used here (and stored in its component.js file instead)
    initialState: {
        courseName: "all",
        courseLevel: ["all"],
        creditNumber: ["all"],
        courseType: ["all"],
    },
    // Listen to state change event
    reducers: {
        setCourseName: (state, action) => {
            if(action.payload === undefined) {
                state.courseName = "all";
            }  else {
                state.courseName = action.payload;
            }
            console.log("setCourseName is called in reducer");
        },
        setCourseLevel: (state, action) => {
            state.courseLevel = action.payload;
        },
        setCreditNumber: (state, action) => {
            state.creditNumber = action.payload;
        },
        setCourseType: (state, action) => {
            state.courseType = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setCourseName, setCourseLevel, setCreditNumber, setCourseType } = searchSlice.actions

export default searchSlice.reducer