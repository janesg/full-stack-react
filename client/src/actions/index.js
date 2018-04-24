import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current-user');

    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    // Reuse same action type as number of
    // credits stored in the User data
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
}
