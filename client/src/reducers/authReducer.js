import {FETCH_USER} from "../actions/types";

// Reducer returns 1 of 3 values:
// - null : indicates we don't know whether user authenticated or not
// - user object : we are authenticated
// - false : we are not authenticated
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;

        default:
            return state;
    }
}