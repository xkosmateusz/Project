import React from "react"
import { Link } from "react-router-dom"
import TwitterLogo from "../styles/assets/twitter-logo.png"
import "../styles/landing.css"

function Landing() {
  return (
    <div className="main">
      <div className="wrapper">
        <div className="left">
          <div className="items-wrapper">
            <div className="item">
              <span className="icon">
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
              <span className="label">Wyszukuj to co Cię interesuje.</span>
            </div>
            <div className="item">
              <span className="icon">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <span className="label">Posłuchaj co inni o tym mówią.</span>
            </div>
            <div className="item">
              <span className="icon">
                <i className="fa fa-comment" aria-hidden="true"></i>
              </span>
              <span className="label">Dołącz do rozmowy.</span>
            </div>
          </div>
        </div>

        <div className="center">
          <img src={TwitterLogo} alt="logo" style={{ width: "50px" }} />
          <h1>
            Najświeższe wieści ze świata
          </h1>
          <span>Dołącz do Twittera.</span>
          <Link to="/signup" className="btn-sign-up">
            Zarejestruj się
          </Link>
          <Link to="/login" className="btn-login">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing