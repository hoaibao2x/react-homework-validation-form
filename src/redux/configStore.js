import { combineReducers, createStore } from 'redux';
import { QLSinhVienReducer } from './reducer/QLSinhVienReducer';

const rootReducer = combineReducers({
    QLSinhVienReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());