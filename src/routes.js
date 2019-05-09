import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import SingleBook from './components/widgets/singleBook/singleBook';
import AllBooks from './components/AllBooks';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup/signup';
import SignIn from './components/Signin/signin';
import PrivateRoute from './components/authRoutes/privateRoute';
import PublicRoute from './components/authRoutes/publicRoute';

const Routes = props => {
  return (
    <Layout {...props}>
      <Switch>
        <PublicRoute path="/books/:id" restricted={false} {...props} exact component={SingleBook} />
        <PublicRoute path="/all-books" restricted={false} {...props} exact component={AllBooks} />
        <PublicRoute path="/sign-up" restricted={false} {...props} exact component={SignUp} />
        <PublicRoute path="/sign-in" restricted={true} {...props} exact component={SignIn} />
        <PublicRoute path="/" restricted={false} {...props} exact component={Home} />
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default Routes;
