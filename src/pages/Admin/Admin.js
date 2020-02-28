import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Bolsistas from "./Bolsistas";
import Funcionario from "./Funcionario";
import Relatorio from "./Relatorio";
import Escolas from "./Escolas";
import Navbar from "./NavBar";
import SimpleList from "./List";
import "./Admin.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      screens: [
        <Relatorio />,
        <Funcionario />,
        <Bolsistas />,
        <Escolas />,
        null
      ],
      active: null
    };
  }
  componentDidMount = screen => {
    screen == null
      ? this.setState({ active: this.state.screens[0] })
      : this.setState({ active: this.state.screens[screen] });
  };

  render() {
    return (
      <div>
        <Container
          fluid
          style={{
            paddingLeft: 0
          }}
        >
          <Row>
            <Col md={12}>
              <Navbar />
            </Col>
          </Row>
          <div id="div_sidearea">
            <div id="div_sidebar">
              <SimpleList
                screens={this.state.screen}
                onClick={this.componentDidMount}
              />
            </div>

            <Container fluid>
              <div id="div_screen">
                <Paper elevation={3}>{this.state.active}</Paper>
              </div>
            </Container>
          </div>
        </Container>
      </div>
    );
  }
}
