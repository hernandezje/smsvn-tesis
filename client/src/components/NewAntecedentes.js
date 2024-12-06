import React, { Component } from "react";
import { createAntecedentes } from "./UserFunctions";

class NewAntecedentes extends Component {
  constructor() {   
    super();
    this.state = {
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
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newAntecedentes = {
      Adicciones: this.state.Adicciones,
      Descripcion_Adic: this.state.Descripcion_Adic,
      Patologias: this.state.Patologias,
      Descripcion_Pat: this.state.Descripcion_Pat,
      Recibe_Tratamiento: this.state.Recibe_Tratamiento,
      Descripcion_Tratam: this.state.Descripcion_Tratam,
      Alergias: this.state.Alergias,
      Descripcion_Aler: this.state.Descripcion_Aler,
      Vacunas: this.state.Vacunas,
      Descripcion_Vac: this.state.Descripcion_Vac,
    };

      createAntecedentes(newAntecedentes).then(() => {
        console.log("LLEGA 0:", newAntecedentes);
        this.props.history.push(`/antecedentes`);
      });
  }

  render() {
    const { Adicciones, Descripcion_Adic, Patologias, Descripcion_Pat, Recibe_Tratamiento, Descripcion_Tratam, Alergias, Descripcion_Aler, Vacunas, Descripcion_Vac } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registrar antecedentes</h1>

              <div className="form-group">
                <label htmlFor="Adicciones">El progenitor materno sufrio o sufre de adicciones?</label>
                <select
                  className="form-control"
                  name="Adicciones"
                  value={Adicciones}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>                
              </div>
              {Adicciones === "SI" && ( // Renderiza este bloque solo si "SI" está seleccionado
              <div className="form-group">
                <label htmlFor="Descripcion_Adic">Descripción de Adicciones</label>
                <input
                  type="text"
                  className="form-control"
                  name="Descripcion_Adic"
                  placeholder="Describa la/las adicciones..."
                  value={Descripcion_Adic}
                  onChange={this.onChange}
                />
              </div>)}
              <div className="form-group">
                <label htmlFor="Patologias">El neonato sufre alguna patologia médica?</label>
                <select
                  className="form-control"
                  name="Patologias"
                  value={Patologias}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {Patologias === "SI" && ( // Renderiza este bloque solo si "SI" está seleccionado
              <div className="form-group">
                <label htmlFor="Descripcion_Pat">Descripción de Patologías</label>
                <input
                  type="text"
                  className="form-control"
                  name="Descripcion_Pat"
                  placeholder="Describa la/las patologías que posee..."
                  value={Descripcion_Pat}
                  onChange={this.onChange}
                />
              </div>)}
              <div className="form-group">
                <label htmlFor="Recibe_Tratamiento">El neonato recibe algun tratamiento médico?</label>
                <select
                  className="form-control"
                  name="Recibe_Tratamiento"
                  value={Recibe_Tratamiento}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {Recibe_Tratamiento === "SI" && ( // Renderiza este bloque solo si "SI" está seleccionado
              <div className="form-group">
                <label htmlFor="Descripcion_Tratam">Descripción de Tratamientos</label>
                <input
                  type="text"
                  className="form-control"
                  name="Descripcion_Tratam"
                  placeholder="Describa el/los tratamientos que recibe..."
                  value={Descripcion_Tratam}
                  onChange={this.onChange}
                />
              </div>)}
              <div className="form-group">
                <label htmlFor="Alergias">El neonato posee alguna alérgia?</label>
                <select
                  className="form-control"
                  name="Alergias"
                  value={Alergias}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {Alergias === "SI" && ( // Renderiza este bloque solo si "SI" está seleccionado
              <div className="form-group">
                <label htmlFor="Descripcion_Aler">Descripción de Alérgias</label>
                <input
                  type="text"
                  className="form-control"
                  name="Descripcion_Aler"
                  placeholder="Describa la/las alérgias que posee..."
                  value={Descripcion_Aler}
                  onChange={this.onChange}
                />
              </div>)}
              <div className="form-group">
                <label htmlFor="Vacunas">El neonato posee alguna vacuna?</label>
                <select
                  className="form-control"
                  name="Vacunas"
                  value={Vacunas}
                  onChange={this.onChange}
                >
                  <option value="NO">NO</option>
                  <option value="SI">SI</option>
                </select>
              </div>
              {Vacunas === "SI" && ( // Renderiza este bloque solo si "SI" está seleccionado
              <div className="form-group">
                <label htmlFor="Descripcion_Vac">Descripción de Vacunas</label>
                <input
                  type="text"
                  className="form-control"
                  name="Descripcion_Vac"
                  placeholder="Describa las vacunas que posee.."
                  value={Descripcion_Vac}
                  onChange={this.onChange}
                />
              </div>)}

              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Cargar Antecedentes
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAntecedentes;
