import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import './footer.scss';
import Addlist from './addlist.png'

const Footer = () => (
    
<div className="footer">

        <div className="addAList">
            <div className="list">
                <p className="buttonLabel">Ajouter une nouvelle liste </p>
                <NavLink to="/create-list" href=""><img className="addlist"  src={Addlist}></img></NavLink>
            </div>
        </div>

    <Responsive minWidth={1023}>

    
        <div className="footer-menu">
            <ul className='nav-footer'>
                <li className="li"><a href="">CGU</a></li>  
                <li className="li"><a href="">Contact</a></li>
            </ul>
        </div>
    </Responsive>
     
    <Responsive maxWidth={1023}>
        <div className="footer-menu">
            <ul className='nav-footer-mobile'>
                <li className="li-mobile"><NavLink to="/listes" href="">Mes listes
                </NavLink></li>  
                <li className="li-mobile"><NavLink to="/recettes" href="">Mes recettes
                </NavLink></li>
                <li className="li-mobile"><NavLink to="/saisons" href="">Fruits & légumes
                </NavLink></li>
            </ul>
          </div>
    </Responsive>
</div>
)

export default Footer;

/*

 <FixedArea fixed='bottom'>
        <Grid columns={3}>
            <Grid.Row className="footer-grid">
              <Grid.Column >
                <Header className='nav-footer' as='h1'>Mes Listes</Header>  
              </Grid.Column>
              <Grid.Column>
                <Header as='h1' className='nav-footer'>Mes Recettes</Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1' className='nav-footer'>Légumes de saison/recettes</Header>
              </Grid.Column>
            </Grid.Row>
        </Grid>
    </FixedArea> 

*/

