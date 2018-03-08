import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
// import {complaintReducers} from '../reducer';

export default createStore(
  combineReducers({
    form: formReducer,
    // complaintform:complaintReducers
  })
);