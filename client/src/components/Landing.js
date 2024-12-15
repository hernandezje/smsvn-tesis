import React, { Component } from "react";
import logo from "../images/babyhelp.png";

class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="jumbotron mt-5">
          {/* Sección WELCOME1: Título */}
          <div className="row">
            <div className="col-md-6 text-center">
            <br/>
            <br/>
              <h1 className="display-6">¡BIENVENIDO A BABYHELP!</h1>
            </div>
            {/* Sección WELCOME2: Imagen */}
            <div className="col-md-6 text-center">
              <img
                src={logo}
                alt="BABYHELP"
                className="img-fluid"
                style={{ maxHeight: "200px" }}
              />
            </div>

          </div>
        </div>
        {/* Sección WELCOME3: Descripción */}
        <div className="col-sm-12">
          <h2 className="text-center my-4">¡Descubre BABYHELP2! Tu aliado en salud y bienestar</h2>
          <p className="text-justify">
          En BABYHELP, hemos creado un innovador dispositivo pensado para brindar tranquilidad a los padres y proteger a los recién nacidos en sus primeros y más delicados meses de vida.
          Nuestro dispositivo inteligente monitorea en tiempo real los signos vitales del bebé, proporcionando una herramienta clave para prevenir el síndrome de muerte súbita, una de las principales preocupaciones en los primeros nueve meses.
          Pero no solo eso: este sistema de monitoreo constante también ayuda a prevenir accidentes y ofrece datos valiosos para garantizar el bienestar del bebé en todo momento. 
          </p>
          <h3 className="text-center my-3">¿Qué hace especial BABYHELP?</h3>
          <ul>
            <li><b>Prevención que salva vidas:</b> Detecta señales tempranas de posibles problemas de salud o accidentes, ayudándote a actuar a tiempo y reduciendo riesgos innecesarios.</li>
            <li><b>Monitoreo al instante:</b> Accede a datos en tiempo real sobre el bienestar del recien nacido, lo que te permite apoyo en su cuidado y mejorar tu calidad de vida.</li>
            <li><b>Información de los cambios:</b> BABYHELP permite informar al médico e interesados, sobre los cambios en los signos del recien nacido en los últimos días.</li>
          </ul>
          <p className="text-justify">
            <b>Porque la salud comienza con la prevención:</b> Con BABYHELP, cuidar de ti y de los tuyos nunca había sido tan fácil. 
            Este dispositivo es un compromiso con el bienestar de tu hijo y tu tranquilidad.
          </p>
          <h4 className="text-center mt-4">¡Haz de BABYHELP parte de tu vida hoy mismo y da el primer paso hacia un futuro más seguro!</h4>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

export default Landing;
