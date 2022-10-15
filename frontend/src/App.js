import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Brand } from './Brand';
import { Car } from './Car';
import { Navigation } from './Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Car Dealership Management
        </h3>

        <Navigation />

        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/brand' component={Brand} />
          <Route path='/car' component={Car} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;