// App.jsx
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/register';
import Success from './components/success'; // Success bileşenini import et
import './App.css'
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        {/* Success sayfası rotası */}
        <Route path="/success">
          <Success />
        </Route>
        {/* Varsayılan rota */}
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}