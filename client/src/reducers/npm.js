import { FETCH_PACKAGE, RESET } from '../actions/types'

export default function(state = { packages: {}, currentPackage: {} }, action = {}) {
    switch(action.type) {
        case FETCH_PACKAGE:
            if  (state.packages[action.package.name]) {
                return {
                    ...state,
                    currentPackage: {
                        name: action.package.name,
                        dependencies: action.package.dependencies
                    },
                }
            } 
            return {
                ...state,
                currentPackage: {
                    name: action.package.name,
                    dependencies: action.package.dependencies
                },
                packages: {
                    ...state.packages,
                    [action.package.name]: {
                        ...action.package.dependencies
                    }
                }
            };
        default: return state;
    }
}