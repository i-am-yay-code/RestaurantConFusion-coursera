import { configureStore } from '@reduxjs/toolkit'
import fullDataReducer from './reducer';

export default configureStore({
    reducer: {
        fullData: fullDataReducer,
    }
})

