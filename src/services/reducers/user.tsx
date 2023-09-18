import {
    CHANGEPASSWORD_ERROR,
    CHANGEPASSWORD_REQUEST,
    CHANGEPASSWORD_SUCCESS,
    GETUSER_ERROR,
    GETUSER_REQUEST,
    GETUSER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTRATION_ERROR,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    RESETPASSWORD_ERROR,
    RESETPASSWORD_REQUEST,
    RESETPASSWORD_SUCCESS, TUserActions, UPDATEUSER_ERROR,
    UPDATEUSER_REQUEST,
    UPDATEUSER_SUCCESS
} from "../actions/user";
import {TUserInitialStateType} from "../../utils/types";


const wsInitialState: TUserInitialStateType = {
    registrationRequest: false,
    registrationRequestFailed: false,
    registrationSuccess: false,
    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
    resetPasswordSuccess: false,
    changePasswordRequest: false,
    changePasswordRequestFailed: false,
    changePasswordSuccess: false,
    getUserRequest: false,
    getUserRequestFailed: false,
    getUserSuccess: false,
    updateUserRequest: false,
    updateUserRequestFailed: false,
    updateUserSuccess: false,
    loginRequest: false,
    loginRequestFailed: false,
    logoutRequest: false,
    logoutRequestFailed: false,
    loginSuccess: false,
    isForgotPassword: false,
    userData: null,
    success: false,
    errorMessage: null
};

export const userReducer = (state = wsInitialState, action: TUserActions) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                registrationRequestFailed: false,
            };
        }

        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationRequest: false,
                registrationSuccess: true,
                userData: action.data.user,
                success: action.data.success

            }
        }

        case REGISTRATION_ERROR: {
            return {
                ...state,
                registrationRequestFailed: true,
                registrationRequest: false,
                errorMessage: action.data
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: true,
                userData: action.data.user
            }
        }

        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                loginSuccess: false,
                userData: ''
            }
        }

        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false
            }
        }

        case GETUSER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserRequestFailed: false,
            };
        }

        case GETUSER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserSuccess: true,
                userData: action.data.user,

            }
        }

        case GETUSER_ERROR: {
            return {
                ...state,
                getUserRequestFailed: true,
                getUserRequest: false,
                errorMessage: action.data
            }
        }

        case UPDATEUSER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserRequestFailed: false,
            };
        }

        case UPDATEUSER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true,
                userData: action.data.user,

            }
        }

        case UPDATEUSER_ERROR: {
            return {
                ...state,
                updateUserRequestFailed: true,
                updateUserRequest: false,
                errorMessage: action.data
            }
        }

        case RESETPASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            };
        }

        case RESETPASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: true,
                isForgotPassword: action.data

            }
        }

        case RESETPASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordRequestFailed: true,
                resetPasswordRequest: false,
                errorMessage: action.data
            }
        }

        case CHANGEPASSWORD_REQUEST: {
            return {
                ...state,
                changePasswordRequest: true,
                changePasswordRequestFailed: false,
            };
        }

        case CHANGEPASSWORD_SUCCESS: {
            return {
                ...state,
                changePasswordRequest: false,
                changePasswordSuccess: true

            }
        }

        case CHANGEPASSWORD_ERROR: {
            return {
                ...state,
                changePasswordRequestFailed: true,
                changePasswordRequest: false,
                errorMessage: action.data
            }
        }

        default: {
            return state
        }
    }
}