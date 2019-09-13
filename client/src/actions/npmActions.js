import axios from 'axios';

import { FETCH_PACKAGE } from './types';

export function displayPackage(pckg) {
    return {
        type: FETCH_PACKAGE,
        package: pckg
    }
}

export function fetchPackage(pckg) {
    return dispatch => {
        return axios.get(`http://localhost:3400/getInfo/${pckg}`)
            .then(({ data: { success, response } }) => {
                if (success) {
                    dispatch(displayPackage(response))
                    return new Promise((resolve) => {
                        resolve({ success })
                    });
                }
                else {
                    return new Promise((resolve) => {
                        resolve({ success })
                    });
                }
            })
    }
}