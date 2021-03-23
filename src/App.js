import { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './pages/admin/admin';
import Home from './pages/home/home';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const routes = loggedIn ? (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' render={(props) => <Login login={setLoggedIn} {...props} />} />
      <Route path='/admin' component={Admin} />
      <Route path='*' component={NotFound} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' render={(props) => <Login login={setLoggedIn} {...props} />} />
      <Redirect from='/admin' to='login' />
      <Route path='*' component={NotFound} />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}
