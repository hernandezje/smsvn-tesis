import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      Nombre_Apellido: "",
      Email: "",
      Telefono: "",
      Parentezco: "",
      Direccion: "",
      Progenitor: "", // Cambiado a un valor  "si" o "no"
      DNI: "", // Agregado el campo DNI
      errors: {}
    };
  }

  componentDidMount() {
    // Obtener el token del localStorage
    const token = localStorage.usertoken;

    // Verificar si hay un token
    if (token) {
      const decoded = jwt_decode(token); // Decodificar el token

      // Usar el ID del usuario decodificado para obtener los datos desde el backend
      axios
        .get("http://localhost:5000/users/profile", {
          headers: {
            Authorization: token
          }
        })
        .then((response) => {
          const {  DNI, Nombre_Apellido, Email, Telefono, Parentezco, Direccion, Progenitor } = response.data;
          this.setState({
            DNI, // Agregado
            Nombre_Apellido,
            Email,
            Telefono,
            Parentezco,            
            Progenitor, // Cambiado
            Direccion,
          });
        })
        .catch((error) => {
          console.error("Error al obtener el perfil:", error);
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
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
             <tr>
                <td>DNI</td>
                <td>{this.state.DNI}</td>
              </tr>
              <tr>
                <td>Nombre y Apellido</td>
                <td>{this.state.Nombre_Apellido}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.Email}</td>
              </tr>
              <tr>
                <td>Teléfono</td>
                <td>{this.state.Telefono}</td>
              </tr>
              <tr>
                <td>Parentesco</td>
                <td>{this.state.Parentezco}</td>
              </tr>              
              <tr>
                <td>Progenitor</td>
                <td>{this.state.Progenitor}</td>
              </tr>
              <tr>
                <td>Dirección</td>
                <td>{this.state.Direccion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profile;
