import validator from 'validator'
import superagent from 'superagent'
import { browserHistory } from 'react-router'

export function onChange(input, name){
  return {
    type: "LOGIN_FORM_ONCHANGE",
    value: input.target.value,
    name: name,
  }
}

export function checkAuthStatus(authStatus){
  if(!authStatus){
    browserHistory.push('/dashboard')
  }
}

export function submitLogin(loginForm){
  return function (dispatch) {
    // Simple Validation before submit if failed display error otherwise send form
    let errorMessage = ''
    if(validator.isEmpty(loginForm.email) || !validator.isEmail(loginForm.email)){
      errorMessage += 'Invalid Email';
    }
    if(validator.isEmpty(loginForm.password)){
      errorMessage += ' Invalid Password';
    }
    if(errorMessage !== ''){
      dispatch({ type: 'ERROR', message: errorMessage })
    } else {
      superagent
        .post('http://localhost:9000/api/login')
        .send(loginForm)
        .set('Accept', 'application/json')
        .end(function(err, response){
          if(err){
            dispatch({type: 'ERROR',message: err})
          } else {
            // Clear previous errors if any
            dispatch({ type: 'ERROR', message: '' })
            dispatch({type: 'LOGIN_SUCCESS', userInfo: response.body})
            browserHistory.push('/dashboard')
          }
        });
    }
  }
}

export function dashboardInit(userInfo) {
  return function (dispatch) {
    // Set pending state
    dispatch({type: 'DASHBOARD_INIT', dashboardStatus: 'pending', userTransactions: [] })
    superagent
      .get('http://34.234.241.168/transaction/' + userInfo.id)
      .set('Accept', 'application/json')
      .end(function(err, response){
        if(err){
          console.log(err);
          dispatch({type: 'ERROR',message: err})
        } else {
          dispatch({type: 'DASHBOARD_INIT', dashboardStatus: 'ready', userTransactions: response.body })
        }
      });
  }
}
