import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import routes from './routes';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        {routes.map((route) => (
          <Route {...route} key={route.path} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
