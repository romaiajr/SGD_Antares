import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import Register2 from "./pages/register2/Register";
import School from "./pages/school/school";
import funcionario_principal from "./pages/Funcionario/Funcionario";
import Scholarship from "./pages/Scholarship/Scholarship";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import User from './pages/user/user';
import Schedule from "./components/Padrao/schedule/Schedule"
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={props => 
        isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: {from: props.location} }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastro" component={Register2} />
      <PrivateRoute exact path="/escola/:id" component={School} />
      <PrivateRoute exact path="/usuario/:id" component={User} />
      <PrivateRoute exact path="/bolsista/:id" component={Scholarship}/>
      <Route excat path="/Funcionario/:id" component={funcionario_principal} />
      <Route excat path="/administrador/:id" component={Admin} />
      <Route excat path="/horariosDisponiveis" component={Schedule} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
