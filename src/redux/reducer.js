import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { DISHES } from '../shared/dishes';
import { createSlice } from '@reduxjs/toolkit'

const InitialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const fullDataSlice = createSlice({
    name: 'fullData',
    initialState: InitialState,
    reducers: {}
})

export default fullDataSlice.reducer