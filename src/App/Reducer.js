
const initialState = {
  authStatus: false,
  dashboardStatus: 'unset',
  loginForm: {
    email: '',
    password: '',
  },
  userInfo: {},
  userTransactions: [],
  error: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'DASHBOARD_INIT':
      return {
        ...state,
        userTransactions: action.userTransactions,
        dashboardStatus: action.dashboardStatus,
      }
    case 'LOGIN_FORM_ONCHANGE':
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.name]: action.value,
        }
      }
    case 'ERROR':
      return {
        ...state,
        error: action.message
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authStatus: true,
        userInfo: action.userInfo,
      }
    default:
      return state;
  }
};
