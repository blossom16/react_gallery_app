import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>

          <NavLink to="/Otters">Otters</NavLink>
        </li>
        <li>
          <NavLink to="/Pelicans">Pelicans</NavLink>
        </li>
        <li>
          <NavLink to="/Whales">Whales</NavLink>

        </li>
      </ul>

    </nav>
  );
};



export default Nav;