import React from 'react';

function LoginComponent(props) {
  return (
    <div className="login-flexbox-centered">
      <div className="login-form-container">
        {props.reduxStore.error !== '' ? (
          <div className="alert alert-danger animated bounceInDown" role="alert">
            {props.reduxStore.error}
          </div>
        ) : ('')}
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            placeholder="Enter email"
            type="email"
            value={props.reduxStore.loginForm.email}
            onChange={(e)=>{props.onChange(e, 'email')}}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            value={props.reduxStore.loginForm.password}
            onChange={(e)=>{props.onChange(e, 'password')}}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>props.submitLogin(props.reduxStore.loginForm)}>Submit</button>
      </div>
    </div>
  );
}

export default LoginComponent;
