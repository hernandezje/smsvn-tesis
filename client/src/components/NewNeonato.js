import React, { Component } from "react";
import { createNeonato } from "./UserFunctions";

class NewNeonato extends Component {
  constructor() {
    super();
    this.state = {
      DNI: "",
      Nombre_Apellido: "",
      Sexo: "",
      Fecha_Nac: "",
      Peso: "",
      Altura: "",
      Grupo_Sanguineo: "",
      Condicion_Nac: "",
      errors: {},
      isSubmitDisabled: true, // Nueva bandera para deshabilitar el botón
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onFechaChange = this.onFechaChange.bind(this); // Nuevo método
  }

  // Método genérico para manejar cambios en campos
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Método específico para manejar y validar cambios en Fecha_Nac
  onFechaChange(e) {
    const fecha = e.target.value;

    // Actualizamos el estado
    this.setState({ Fecha_Nac: fecha }, () => {
      this.validateFecha(); // Llamar a la validación después de actualizar el estado
    });
  }

  // Validar Fecha_Nac
  validateFecha() {
    const hoy = new Date();
    const fechaNac = new Date(this.state.Fecha_Nac);

    // Validar si la fecha ingresada es válida
    if (isNaN(fechaNac)) {
      this.setState({
        errors: { ...this.state.errors, Fecha_Nac: "Fecha no válida" },
        isSubmitDisabled: true, // Deshabilitar el botón
      });
      return;
    }

    // Validar que la fecha no exceda los 9 meses o sea futura
    const diferenciaMeses =
      hoy.getFullYear() * 12 + hoy.getMonth() -
      (fechaNac.getFullYear() * 12 + fechaNac.getMonth());

    if (diferenciaMeses > 9 || fechaNac > hoy) {
      this.setState({
        errors: { ...this.state.errors, Fecha_Nac: "La fecha no debe exceder los 9 meses ni ser futura" },
        isSubmitDisabled: true, // Deshabilitar el botón
      });
    } else {
      // Limpiar errores si la fecha es válida
      this.setState({
        errors: { ...this.state.errors, Fecha_Nac: null },
        isSubmitDisabled: false, // Habilitar el botón
      });
    }
  }

  // Manejar envío del formulario
  onSubmit(e) {
    e.preventDefault();

    const newNeonato = {
      DNI: this.state.DNI,
      Nombre_Apellido: this.state.Nombre_Apellido,
      Sexo: this.state.Sexo,
      Fecha_Nac: this.state.Fecha_Nac,
      Peso: this.state.Peso,
      Altura: this.state.Altura,
      Grupo_Sanguineo: this.state.Grupo_Sanguineo,
      Condicion_Nac: this.state.Condicion_Nac,
    };

    createNeonato(newNeonato).then(() => {
      console.log("LLEGA 0:", newNeonato);
      this.props.history.push(`/neonato`);
    });
  }

  // Manejar cancelación
  onCancel() {
    this.props.history.push(`/neonato`);
  }

  render() {
    const {
      DNI,
      Nombre_Apellido,
      Sexo,
      Fecha_Nac,
      Peso,
      Altura,
      Grupo_Sanguineo,
      Condicion_Nac,
      errors,
      isSubmitDisabled,
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registrar Nuevo Neonato</h1>

              <div className="form-group">
                <label htmlFor="DNI">DNI</label>
                <input
                  type="text"
                  className="form-control"
                  name="DNI"
                  placeholder="Ingrese el DNI"
                  value={DNI}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nombre_Apellido">Nombre y Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nombre_Apellido"
                  placeholder="Ingrese el nombre y apellido"
                  value={Nombre_Apellido}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Sexo">Sexo</label>
                <select
                  className="form-control"
                  name="Sexo"
                  value={Sexo}
                  onChange={this.onChange}
                >
                  <option value="MUJER">MUJER</option>
                  <option value="VARON">VARON</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Fecha_Nac">Fecha y Hora de Nacimiento</label>
                <input
                  type="datetime-local"
                  className={`form-control ${
                    errors.Fecha_Nac ? "is-invalid" : ""
                  }`}
                  name="Fecha_Nac"
                  value={Fecha_Nac}
                  onChange={this.onFechaChange} // Usar el nuevo método
                />
                {errors.Fecha_Nac && (
                  <div className="invalid-feedback">{errors.Fecha_Nac}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Peso">Peso (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="Peso"
                  placeholder="Ingrese el peso"
                  value={Peso}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Altura">Altura (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  name="Altura"
                  placeholder="Ingrese la altura"
                  value={Altura}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Grupo_Sanguineo">Grupo Sanguíneo</label>
                <input
                  type="text"
                  className="form-control"
                  name="Grupo_Sanguineo"
                  placeholder="Ingrese el grupo sanguíneo"
                  value={Grupo_Sanguineo}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Condicion_Nac">Describa su nacimiento</label>
                <input
                  type="text"
                  className="form-control"
                  name="Condicion_Nac"
                  placeholder="Por ejemplo: Prematuro, Parto natural, etc."
                  value={Condicion_Nac}
                  onChange={this.onChange}
                />
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                  disabled={isSubmitDisabled} // Deshabilitar botón si hay errores
                >
                  Registrar
                </button>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={this.onCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNeonato;
