import { configureStore } from '@reduxjs/toolkit'
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default configureStore({
    reducer: {
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders
    },
    middleware: [thunk, logger]
})

