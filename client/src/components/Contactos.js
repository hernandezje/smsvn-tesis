import React, { Component } from "react";
import { getAllContacts } from "./UserFunctions"; // Importa la función para obtener los contactos

class Contactos extends Component {
  constructor() {
    super();
    this.state = {
      contactos: [], // Almacena todos los contactos
      errors: {}
    };
  }

  componentDidMount() {
    // Obtener todos los contactos al montar el componente
    this.fetchContactos();
  }

  // Función para obtener los contactos usando la función getAllContacts
  fetchContactos = async () => {
    try {
      const contactos = await getAllContacts(); // Llama a la función para obtener los contactos
      if (contactos) {
        this.setState({ contactos }); // Actualiza el estado con los contactos
      }
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-3 font-weight-normal">Contactos</h1>
        <div className="col-sm-8 mx-auto">
        </div>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="thead">
              <tr>
                <th scope="col" className="cb">DNI</th>
                <th scope="col" className="cb">Nombre</th>
                <th scope="col" className="cb">Tel.</th>
                <th scope="col" className="cb">Parent.</th>
                <th scope="col" className="cb">Direc.</th>
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

export default Contactos;
