import * as types from '../constants/types';
import { fetchPhoneById as fetchPhoneByIdApi } from '../api/index';

export const fetchPhoneById = (id) => async (dispatch) => {

    dispatch({
        type: types.phone.START
    });

    try {
        const phone = await fetchPhoneByIdApi(id);

        dispatch({
            type: types.phone.SUCCESS,
            payload: phone
        });
    } catch (err) {
        dispatch({
            type: types.phone.FAILURE,
            payload: err,
            error: true
        });
    }
};