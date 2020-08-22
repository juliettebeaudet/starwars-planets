import { combineReducers } from 'redux';
import { REQUEST, DATA, FAIL, INPUT_NAME, SELECT_NUMBER, CANCEL_FILTER, CLEAR, BACK_TO_FULL_LIST } from '../actions';

const initialState = {
  fetching: false,
  data: [],
  error: '',
};

function planetReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return { ...state, fetching: true };
    case DATA:
      return { ...state, fetching: false, data: action.data };
    case FAIL:
      return { ...state, fetching: false, error: action.err };
    default:
      return state;
  }
}

const initialStateInput = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    // {
    //   column: '',
    //   comparison: '',
    //   value: '',
    // },
  ],
};

function filters(state = initialStateInput, action) {
  switch (action.type) {
    case INPUT_NAME:
      return {
        ...state,
        filterByName: { ...state.filterByName, name: action.input },
      };
    case SELECT_NUMBER:
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues,
          { column: action.col, comparison: action.comp, value: action.v },
        ],
      };
    case CANCEL_FILTER:
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues.slice(0, action.i),
          ...state.filterByNumericValues.slice(action.i + 1, state.filterByNumericValues.length),
        ],
      };
    case CLEAR:
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues.slice(0,0),
        ]
      }
    case BACK_TO_FULL_LIST:
      return {
        ...state,
        filterByName: { ...state.filterByName, name: action.empty },
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ planetReducer, filters });

export default rootReducer;
