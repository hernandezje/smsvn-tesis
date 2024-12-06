import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      contactos: [], // Almacena todos los contactos
      errors: {}
    };
  }
  

  componentDidMount() {
    // Obtener el token del localStorage
    const token = localStorage.usertoken;

    // Verificar si hay un token
    if (token) {
      // Hacer la solicitud para obtener todos los contactos desde el backend
      axios
        .get("http://localhost:5000/users/contactos", {
          headers: {
            Authorization: token
          }
        })
        .then((response) => {
          // Actualizar el estado con los datos recibidos
          this.setState({ contactos: response.data });
        })
        .catch((error) => {
          console.error("Error al obtener los contactos:", error);
        });
    } else {
      console.log("No token found");
    }
  }

  render() {
    return (
      
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Contactos</h1>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>DNI</th>
                <th>Nombre y Apellido</th>
                <th>Teléfono</th>
                <th>Parentesco</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contactos.length > 0 ? (
                this.state.contactos.map((contacto, index) => (
                  <tr key={index}>
                    <td>{contacto.DNI}</td>
                    <td>{contacto.Nombre_Apellido}</td>
                    <td>{contacto.Telefono}</td>
                    <td>{contacto.Parentezco}</td>
                    <td>{contacto.Direccion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay contactos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
