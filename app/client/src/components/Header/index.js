import React, { useState, useRef } from 'react';

import { NavLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from 'src/components/Menu-Burger/hooks';
import { GlobalStyles } from 'src/components/Menu-Burger/global';
import { theme } from 'src/components/Menu-Burger/theme';
import { Burger } from 'src/components/Menu-Burger/components';
import { Menu } from 'src/components/Menu-Burger/components';

import { Header, Segment } from 'semantic-ui-react'
<link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css"></link>

// Styles et assets
import './header.scss';
import Logo from './images/logo.png';
import Ptimenu from './images/menu.png';
import Compte from './images/compte.png';

// Insertion des premières ancres de navigation dans le Header à l'aide de NavLink qui enveloppe l'élément (div, lu, ul, etc) complété par le paramètre to="" qui reprendre le chemin indiqué dans le fichier App.js
function Nav() {
  
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (

  <div id="header" ref={node}>

      <ul id="menu">
        
        <li className="logo-div">
        <NavLink to="/" id="a" href="">
        <img className="logo-head" src={Logo}/>
        </NavLink>
        </li>
       
        <li id="nav-desktop">
        <NavLink to='/listes' id="a" href="">
        Mes listes
        </NavLink>
        </li>

        <li id="nav-desktop">
          <NavLink to="/recettes" id="a" href="">Mes recettes
          </NavLink>
        </li>
        <li id="nav-desktop">
          <NavLink to="/carousel" id="a" href="">Légumes de saison
          </NavLink>
        </li>

        <li id="nav-desktop">
          <NavLink to='/account' id="a" href="">
          Mon compte
          </NavLink>
        </li>
        
        <ul id="picto">

          <NavLink to="/login" id="a" href=""><img className="picto-compte" src={Compte} /></NavLink>
          
          <li id="nav2">
          <NavLink to="/login" id="a" href="">
          Connexion
          </NavLink>
          </li>
          
        </ul>
        
      </ul>

      <ThemeProvider theme={theme}>

        <GlobalStyles />
  
        <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>

      </ThemeProvider>
 
  </div>
);
}
export default Nav;