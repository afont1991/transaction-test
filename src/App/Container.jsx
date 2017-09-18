import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import Navigation from './Components/Navigation'
import * as actions from './Actions';

class App extends Component {
  componentWillMount(){
    if(this.props.location.pathname !== '/' && !this.props.reduxStore.authStatus){
      browserHistory.push('/')
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.location.pathname === '/' && nextProps.reduxStore.authStatus){
      browserHistory.push('/dashboard')
    }
  }
  componentDidUpdate(){
    if(this.props.location.pathname === '/dashboard' && this.props.reduxStore.dashboardStatus === 'unset'){
      this.props.dashboardInit(this.props.reduxStore.userInfo)
    }
  }
  render() {
    const authStatus = this.props.reduxStore.authStatus
    return (
      <div className="container-fluid">
        <Navigation authStatus={authStatus}/>
        {React.cloneElement(this.props.children, {
          ...this.props,
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {reduxStore: state.App}
}

const mapDispatchToProps = (dispatch) => {
  return {
    dashboardInit: (userInfo) => {
      dispatch(actions.dashboardInit(userInfo))
    },
    onChange: (input, name) => {
      dispatch(actions.onChange(input, name))
    },
    submitLogin: (loginForm) => {
      dispatch(actions.submitLogin(loginForm))
    },
  }
}

const AppContainer = connect(
  mapStateToProps, mapDispatchToProps
)(App)

export default AppContainer
