import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Switch, Redirect } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './Containers/Checkout/Checkout'
import { Route, BrowserRouter } from 'react-router-dom'
import * as actions from './store/actions/index'
import Orders from './Containers/Checkout/Orders/Orders'
//import ContactInfo from './Containers/Checkout/ContactInfo/ContactInfo'
//import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'
//import Context from './Components/Context/Context'
import { lazyCheckout, lazyContactInfo, auth } from './LazyComponents/LazyComponents'

const App = props => {

  useEffect(() => {
    props.onAuthCheckState()
  }, [])


  let routes = (
    <Switch>
      {/* <Route path='/auth' component={Auth} /> */}
      <Route path='/auth' component={auth} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    //console.log('inside auth check')
    routes = (
      <Switch>
        <Route path='/logout' component={Logout} />

        {/* <Route path='/auth' component={Auth} />
          <Route path='/preview' component={Checkout} />
          <Route path='/contactInfo' component={ContactInfo} /> */}

        <Route path='/auth' component={auth} />
        <Route path='/preview' component={lazyCheckout} />
        <Route path='/contactInfo' component={lazyContactInfo} />

        <Route path='/orders' component={Orders} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Layout>
          {/* <Context.Provider value={{ inputText: this.state.inputText }} >
            <BurgerBuilder />
            </Context.Provider> */}
          {routes}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);