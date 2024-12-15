import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

class UsuarioData extends Component {
  constructor() {
    super();
    this.state = {
      usuario: {}, // Cambiamos a null para indicar que no hay datos inicialmente
      error: null,   // Inicializamos el error como null
      password: "", // Almacena la contraseña ingresada
      showModal: false, // Estado para mostrar u ocultar el modal
      showMessageModal: false, // Estado para mostrar/ocultar el modal de mensaje
      message: "", // Mensaje a mostrar en el modal de mensaje
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this); // Enlazamos el manejador del botón
    this.handleModify = this.handleModify.bind(this); // Manejador para el botón Modificar
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this); // Manejador para Darme de Baja
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
  }
  
  handleRedirect() {
    // Redirigir al formulario de /Login
    this.props.history.push("/login"); 
  }

  async componentDidMount() {
    const token = localStorage.getItem("usertoken"); // Obtener el token almacenado
  
    if (token) {
      try {
        // Decodificar el token para obtener el idUsuario
        const decoded = jwt_decode(token);
        const idUsuario = decoded.idUsuario; // Asegúrate de que el payload del token incluya "idUsuario"
  
        console.log("idUsuario desde el token:", idUsuario);
        console.log("Token decodificado:", jwt_decode(token));

  
        // Realizar la solicitud al backend
        const response = await axios.get(`/users/usuario/${idUsuario}`, {
          headers: { Authorization: token },
        });
        if (response.data && response.data.user) {
          this.setState({ usuario: response.data.user }); // Guardar datos del usuario en el estado
        } else {
          this.setState({ error: "No se encontraron datos del usuario." });
        }
      } catch (err) {
        console.error("Error al cargar los datos del usuario:", err);
        this.setState({ error: "Error al cargar los datos." });
      }
    } else {
      this.setState({ error: "Usuario no autenticado. Inicia sesión para continuar." });
    }
  }
  
  handleModify() {
    // Redirige a una página de edición, enviando los datos del usuario
    const { usuario } = this.state;
    this.props.history.push({
      pathname: `/editUsuario`,
      state: { usuario }, // Pasa el usuario actual al formulario de edición
    });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleDeleteAccount() {
    const { usuario, password } = this.state;
    const token = localStorage.getItem("usertoken");
  
    if (!password) {
      alert("Por favor, ingresa tu clave para continuar.");
      return;
    }
  
    try {
      const response = await axios.post(
        `/users/delete/${usuario.idUsuario}`,
        { password },
        {
          headers: { Authorization: token },
        }
      );
  
      // Actualiza el estado solo después de la eliminación exitosa
      this.setState({
        message: response.data.message || "Cuenta eliminada con éxito.",
        showMessageModal: true,
      });
  
      localStorage.removeItem("usertoken"); // Elimina el token
      //this.props.history.push("/login"); // Redirige a login
    } catch (err) {
      console.error("Error al intentar eliminar la cuenta:", err.response || err);
      alert(
        (err.response && err.response.data && err.response.data.error) ||
          "Hubo un problema al eliminar la cuenta. Inténtalo más tarde."
      );
    }
  }
  

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  toggleMessageModal() {
    this.setState((prevState) => ({ showMessageModal: !prevState.showMessageModal }));
  }

  render() {
    const { usuario, password, showModal, showMessageModal, message } = this.state; // Extraemos los datos del estado
    console.log("clave:", usuario.Clave);
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
              <td>{usuario.Progenitor} </td>
            </tr>
            <tr>
              <td>Dirección:</td>
              <td>{usuario.Direccion} </td>
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
        {/* Botones Modificar y Darme de Baja */}
        <div className="mt-3">
          <button className="btn btn-primary mr-2" onClick={this.handleModify}>
            Modificar
          </button>
          <button className="btn btn-danger" onClick={this.toggleModal}>
            Darme de Baja
          </button>
        </div>

        {/* Modal para ingresar la contraseña */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar eliminación</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={this.toggleModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Para eliminar tu cuenta, ingresa tu contraseña y confirma la
                    acción.
                  </p>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={this.toggleModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.toggleModal(); // Cierra el modal antes de procesar
                      this.handleDeleteAccount(); // Procesa la eliminación
                    }}
                  >
                    Confirmar eliminación
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
         {
    console.log("showMessageModal:", showMessageModal)/* Modal de mensaje */}
         {showMessageModal && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mensaje</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={this.toggleMessageModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{message}</p>
                </div>
                <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={this.handleRedirect}
                >
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