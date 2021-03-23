import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/admin/admin';
import Home from './pages/home/home';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
