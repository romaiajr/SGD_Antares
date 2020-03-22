import React from "react";
import "./style.css";
import { Card, Button, Row, Col, InputGroup, FormControl, Form, Alert, Modal } from "react-bootstrap";
import api from '../../../services/api';
import DateRangeIcon from '@material-ui/icons/DateRange';
//Tela onde a escola poderá vê os seus agendamentos.
export default class MyScheduling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedulings: [{ agendamento: "25/02", Responsável: "Ana", horario: "09:30", status: '0',numAlunos: '40' }, { agendamento: "20/02", Responsável: "Samuel", horario: "11:30", status: '1',numAlunos: '40' }, { agendamento: "25/09", Responsável: "Alice", horario: "15:30", status: '2',numAlunos: '40' }, { agendamento: "25/02", Responsável: "Ana", horario: "09:30", status: '0',numAlunos: '40' }],
      idSchooll: this.props.idSchool,
      controle: false,
      controlCancel:false,
      current: {},
      status: ['warning', 'success', 'secondary'],
      legends: ['Análise', 'confirmado', 'feito']
    };
    this.setControl = this.setControl.bind(this);
    this.setControlCancel = this.setControlCancel.bind(this);
    this.cancelScheduling = this.cancelScheduling.bind(this);
  }

  componentDidMount() {
    // carrega a lista de agendamentos
    //const response = await api.get("/agendamentos", this.state.IDSchool);
    //this.setState({schedulings: Response.data});
  }

  cancelScheduling() {
    //cancela uma visita
    //api.get("/cancelarvisita", this.state.id);
    this.setState({controlCancel: false});
  }

  setControlCancel(event){
    console.log(event.target.name);
    var teste = event.target.name;
    this.setState({ current: this.state.schedulings[teste] })
    this.setState({ controlCancel: true })
  }

  setControl(event) {
    console.log(event.target.name);
    var teste = event.target.name;
    this.setState({ current: this.state.schedulings[teste] })
    this.setState({ controle: true })
  }

  render() {
    return (
      <div>
        <Modal

          show={this.state.controle}
          centered
          onHide={() => this.setState({ controle: false })}
          aria-labelledby="example-modal-sizes-title-lg"
          id='modal'
        >
          <Modal.Header closeButton id='header'>
            <Modal.Title id="example-modal-sizes-title-lg">
              Agendamento de visita
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  Nome do responsável
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="text" placeholder="Nome completo" value={this.state.current.Responsável} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalStudent">
                <Form.Label column sm={3}>
                  Quantidade de alunos
                </Form.Label>
                <Col sm={3}>
                  <Form.Control type="text" placeholder="Max: 40"  value={this.state.current.numAlunos} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalDate">
                <Form.Label column sm={3}>
                  Horário
                </Form.Label>
                <Col sm={3}>
                  <Form.Control Type="text" value={this.state.current.horario} />
                </Col>
              </Form.Group>
            </Form>
            <span>
              Status:
              <Alert variant={this.state.status[this.state.current.status]}>
                {this.state.legends[this.state.current.status]}
              </Alert>
            </span>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.controlCancel}
          
          onHide={() => this.setState({ controlCancel: false })}
          aria-labelledby="example-modal-sizes-title-lg"
          id='modal'
        >
          <Modal.Header closeButton id='header'>
            <Modal.Title id="example-modal-sizes-title-lg">
              Tem certeza que deseja cancelar a visita?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              variant="outline-danger"
              id="cancel2"
              onClick={this.cancelScheduling}
            >
              Cancelar visita
                    </Button>
          </Modal.Body>
        </Modal>
        <div id="head">
          <Row>
            <Col>
              <h1 id="titleScheduling">Meus Agendamentos</h1>
            </Col>
            <Col>
              <InputGroup>
                <FormControl
                  placeholder="Digite a data da visita..."
                  value={this.state.search}
                  onChange={this.handleChange}
                />
                <InputGroup.Prepend>
                  <Button variant="outline-secondary">&#128269;</Button>
                </InputGroup.Prepend>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <div id="list">
          {this.state.schedulings.map(item => (
            // {this.state.days.indexOf(item).toString()}
            <Card id='item' >
              <Card.Body>
                <span>
                  <span id='test'>
                    <DateRangeIcon fontSize="large" />
                  </span>
                  <span id='data'>
                    {item.data}
                  </span>
                  <span id="responsavel">
                    Responsável:{item.Responsável}
                  </span>
                  <span id='button'>
                    <Button
                      variant="outline-primary"
                      id="view"
                      name={this.state.schedulings.indexOf(item)}
                      onClick={this.setControl}
                    >
                      Visualizar
                    </Button>

                    <Button
                      variant="outline-danger"
                      id="cancel2"
                      name={this.state.schedulings.indexOf(item)}
                      onClick={this.setControlCancel}
                    >
                      Cancelar visita
                    </Button>
                  </span>
                </span>
              </Card.Body>
            </Card>

          ))}
        </div>
      </div>
    );
  }
}
