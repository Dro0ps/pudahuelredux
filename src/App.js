import React from 'react';
import Header from "./components/Header";
import Despachos from './components/Despachos';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NuevoDespacho from './components/NuevoDespacho';
import EditarDespacho from './components/EditarDespacho';
import Login from './components/Login';

// Redux
import { Provider } from 'react-redux';
import store from './store';



function App() {


  return (
    <Router>
      <Provider store={store}>

      <Header/>
      <div className="container mt-5">
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Despachos}/>
          <Route exact path="/despachos/nuevo" component={NuevoDespacho}/>
          <Route exact path="/despachos/editar/:id" component={EditarDespacho}/>
        </Switch>


      </div>

      </Provider>
    </Router>
    
  );
}

export default App;
