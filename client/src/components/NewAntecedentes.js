import React, { Component } from "react";
import { createAntecedentes } from "./UserFunctions";

class NewAntecedentes extends Component {
  constructor() {
    super();
    this.state = {
      antecedentes: {
        Adicciones: "NO",
        Descripcion_Adic: "",
        Patologias: "NO",
        Descripcion_Pat: "",
        Recibe_Tratamiento: "NO",
        Descripcion_Tratam: "",
        Alergias: "NO",
        Descripcion_Aler: "",
        Vacunas: "NO",
        Descripcion_Vac: "",
      },
      errors: {}, // Para manejar errores de validación
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState((prevState) => {
      const newAntecedentes = { ...prevState.antecedentes, [name]: value };

      // Vaciar los campos de descripción si el valor es "NO"
      if (name === "Adicciones" && value === "NO") newAntecedentes.Descripcion_Adic = "";
      if (name === "Patologias" && value === "NO") newAntecedentes.Descripcion_Pat = "";
      if (name === "Recibe_Tratamiento" && value === "NO") newAntecedentes.Descripcion_Tratam = "";
      if (name === "Alergias" && value === "NO") newAntecedentes.Descripcion_Aler = "";
      if (name === "Vacunas" && value === "NO") newAntecedentes.Descripcion_Vac = "";

      return { antecedentes: newAntecedentes };
    });
  }

  validateFields() {
    const { antecedentes } = this.state;
    const errors = {};

    // Validar que las descripciones estén llenas si el valor del select es "SI"
    if (antecedentes.Adicciones === "SI" && !antecedentes.Descripcion_Adic.trim()) {
      errors.Descripcion_Adic = "Este campo es obligatorio";
    }
    if (antecedentes.Patologias === "SI" && !antecedentes.Descripcion_Pat.trim()) {
      errors.Descripcion_Pat = "Este campo es obligatorio";
    }
    if (antecedentes.Recibe_Tratamiento === "SI" && !antecedentes.Descripcion_Tratam.trim()) {
      errors.Descripcion_Tratam = "Este campo es obligatorio";
    }
    if (antecedentes.Alergias === "SI" && !antecedentes.Descripcion_Aler.trim()) {
      errors.Descripcion_Aler = "Este campo es obligatorio";
    }
    if (antecedentes.Vacunas === "SI" && !antecedentes.Descripcion_Vac.trim()) {
      errors.Descripcion_Vac = "Este campo es obligatorio";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Retorna `true` si no hay errores
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validateFields()) {
      const { antecedentes } = this.state;

      createAntecedentes(antecedentes).then(() => {
        this.props.history.push(`/antecedentes`);
      });
    }
  }

  onCancel() {
    this.props.history.push(`/antecedentes`);
  }


  render() {
    const { antecedentes, errors } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registrar antecedentes</h1>

              {/* Adicciones */}
              <div className="form-group">
                <label htmlFor="Adicciones">El progenitor materno sufrió o sufre de adicciones?</label>
                <select
                  className="form-control"
                  name="Adicciones"
                  value={antecedentes.Adicciones}
                  onChange={this.handleChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {antecedentes.Adicciones === "SI" && (
                <div className="form-group">
                  <label htmlFor="Descripcion_Adic">Descripción de Adicciones</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Descripcion_Adic ? "is-invalid" : ""}`}
                    name="Descripcion_Adic"
                    placeholder="Describa la/las adicciones..."
                    value={antecedentes.Descripcion_Adic}
                    onChange={this.handleChange}
                  />
                  {errors.Descripcion_Adic && (
                    <div className="invalid-feedback">{errors.Descripcion_Adic}</div>
                  )}
                </div>
              )}

              {/* Patologías */}
              <div className="form-group">
                <label htmlFor="Patologias">El neonato sufre alguna patología médica?</label>
                <select
                  className="form-control"
                  name="Patologias"
                  value={antecedentes.Patologias}
                  onChange={this.handleChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {antecedentes.Patologias === "SI" && (
                <div className="form-group">
                  <label htmlFor="Descripcion_Pat">Descripción de Patologías</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Descripcion_Pat ? "is-invalid" : ""}`}
                    name="Descripcion_Pat"
                    placeholder="Describa la/las patologías..."
                    value={antecedentes.Descripcion_Pat}
                    onChange={this.handleChange}
                  />
                  {errors.Descripcion_Pat && (
                    <div className="invalid-feedback">{errors.Descripcion_Pat}</div>
                  )}
                </div>
              )}

              {/* Recibe Tratamiento */}
              <div className="form-group">
                <label htmlFor="Recibe_Tratamiento">El neonato recibe algún tratamiento médico?</label>
                <select
                  className="form-control"
                  name="Recibe_Tratamiento"
                  value={antecedentes.Recibe_Tratamiento}
                  onChange={this.handleChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {antecedentes.Recibe_Tratamiento === "SI" && (
                <div className="form-group">
                  <label htmlFor="Descripcion_Tratam">Descripción de Tratamientos</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Descripcion_Tratam ? "is-invalid" : ""}`}
                    name="Descripcion_Tratam"
                    placeholder="Describa el/los tratamientos..."
                    value={antecedentes.Descripcion_Tratam}
                    onChange={this.handleChange}
                  />
                  {errors.Descripcion_Tratam && (
                    <div className="invalid-feedback">{errors.Descripcion_Tratam}</div>
                  )}
                </div>
              )}

              {/* Alergias */}
              <div className="form-group">
                <label htmlFor="Alergias">El neonato posee alguna alergia?</label>
                <select
                  className="form-control"
                  name="Alergias"
                  value={antecedentes.Alergias}
                  onChange={this.handleChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {antecedentes.Alergias === "SI" && (
                <div className="form-group">
                  <label htmlFor="Descripcion_Aler">Descripción de Alergias</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Descripcion_Aler ? "is-invalid" : ""}`}
                    name="Descripcion_Aler"
                    placeholder="Describa la/las alergias..."
                    value={antecedentes.Descripcion_Aler}
                    onChange={this.handleChange}
                  />
                  {errors.Descripcion_Aler && (
                    <div className="invalid-feedback">{errors.Descripcion_Aler}</div>
                  )}
                </div>
              )}

              {/* Vacunas */}
              <div className="form-group">
                <label htmlFor="Vacunas">El neonato posee alguna vacuna?</label>
                <select
                  className="form-control"
                  name="Vacunas"
                  value={antecedentes.Vacunas}
                  onChange={this.handleChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {antecedentes.Vacunas === "SI" && (
                <div className="form-group">
                  <label htmlFor="Descripcion_Vac">Descripción de Vacunas</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Descripcion_Vac ? "is-invalid" : ""}`}
                    name="Descripcion_Vac"
                    placeholder="Describa las vacunas..."
                    value={antecedentes.Descripcion_Vac}
                    onChange={this.handleChange}
                  />
                  {errors.Descripcion_Vac && (
                    <div className="invalid-feedback">{errors.Descripcion_Vac}</div>
                  )}
                </div>
              )}
              <div className="mt-3">
              <button type="submit"className="btn btn-primary mr-2">
              Registrar
              </button>
              <button type="button"className="btn btn-danger mr-2" onClick={this.onCancel}>
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

export default NewAntecedentes;
