import React, { Component } from "react";
import { getUserData, deleteUserAccount } from "./UserFunctions"; // Importamos las funciones

class UsuarioData extends Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
      error: null,
      password: "",
      showModal: false,
      showMessageModal: false,
      message: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  handleRedirect() {
    this.props.history.push("/login");
  }

  async componentDidMount() {
    try {
      const userData = await getUserData();
      if (userData && userData.user) {
        this.setState({ usuario: userData.user });
      } else {
        this.setState({ error: "No se encontraron datos del usuario." });
      }
    } catch (err) {
      console.error("Error al cargar los datos del usuario:", err);
      this.setState({ error: "Error al cargar los datos." });
    }
  }

  handleModify() {
    const { usuario } = this.state;
    this.props.history.push({
      pathname: `/editUsuario`,
      state: { usuario },
    });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleDeleteAccount() {
    const { usuario, password } = this.state;

    if (!password) {
      alert("Por favor, ingresa tu clave para continuar.");
      return;
    }

    try {
      const response = await deleteUserAccount(usuario.idUsuario, password);

      this.setState({
        message: response.message || "Cuenta eliminada con éxito.",
        showMessageModal: true,
      });

      localStorage.removeItem("usertoken");
    } catch (err) {
      console.error("Error al intentar eliminar la cuenta:", err);
      alert("Hubo un problema al eliminar la cuenta. Inténtalo más tarde.");
    }
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  toggleMessageModal() {
    this.setState((prevState) => ({ showMessageModal: !prevState.showMessageModal }));
  }

  render() {
    const { usuario, password, showModal, showMessageModal, message } = this.state;

    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Datos del usuario</h1>
        <table className="table">
          <tbody>
            <tr>
              <td>DNI:</td>
              <td>{usuario.DNI}</td>
            </tr>
            <tr>
              <td>Nombre y Apellido:</td>
              <td>{usuario.Nombre_Apellido}</td>
            </tr>
            <tr>
              <td>Telefono:</td>
              <td>{usuario.Telefono}</td>
            </tr>
            <tr>
              <td>Parentesco:</td>
              <td>{usuario.Parentezco}</td>
            </tr>
            <tr>
              <td>Progenitor Sanguíneo?:</td>
              <td>{usuario.Progenitor}</td>
            </tr>
            <tr>
              <td>Dirección:</td>
              <td>{usuario.Direccion}</td>
            </tr>
            <tr>
              <td>Nombre de Usuario:</td>
              <td>{usuario.Usuario}</td>
            </tr>
            <tr>
              <td>Correo Electrónico:</td>
              <td>{usuario.Email}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-3">
          <button className="btn btn-primary mr-2" onClick={this.handleModify}>
            Modificar
          </button>
          <button className="btn btn-danger" onClick={this.toggleModal}>
            Darme de Baja
          </button>
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button type="button" className="close" onClick={this.toggleModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Para eliminar tu cuenta, ingresa tu contraseña y confirma la acción.</p>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={this.toggleModal}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={this.handleDeleteAccount}>
                    Confirmar eliminación
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showMessageModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mensaje</h5>
                  <button type="button" className="close" onClick={this.toggleMessageModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{message}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={this.handleRedirect}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UsuarioData;
