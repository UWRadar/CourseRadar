import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../component/search/controller/SearchQuerySlice'


export default configureStore({
    reducer: { // function that control state
        search: searchReducer
    }
})