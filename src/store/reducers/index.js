import { combineReducers } from 'redux';
import auth from './auth.reducer';
import alert from './alert.reducer';
import movie from './movie.reducer';

export default combineReducers({ alert, movie, auth });
