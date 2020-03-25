import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { NavLink } from 'react-router-dom';

import Logo from './logo.png';
import Fleche from './fleche.png';

const Menu = ({ open, ...props }) => {
  console.log(props);
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>

    <div className="global">
      <div className="div-logo">
      <NavLink to="/" id="a" href="">
        <img className="logo" src={Logo}/>
        </NavLink>
      </div>


      <NavLink to='/listes' id="dist" href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="txt">
            Mes Listes<img className="fleche" src={Fleche}/>
          </div>
        </a>
      </NavLink>

      <NavLink to="/recettes" href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
              Mes recettes<img className="fleche" src={Fleche}/>
            </div>
        </a>
        </NavLink>

        <NavLink to="/saisons" href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
            Légumes de saison<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <NavLink to='/team'href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
            Qui sommes-nous?<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <NavLink to='/account' href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
            Mon Compte<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <div className="space"></div>

        <NavLink to='' href="">
        <a className="bord" href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
            Contact<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <NavLink to='/mentionslegales' href="">
        <a className="bord" href="/mentionslegales" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text">
            Mentions légales<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <NavLink to='' href="">
        <a href="/" tabIndex={tabIndex} onClick={() => props.setOpen(false)}>
          <span aria-hidden="true"></span>
          <div className="text" id="space">
            CGU<img className="fleche" src={Fleche}/>
          </div>
        </a>
        </NavLink>

        <div className="blokeur"></div>

      </div>

    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;