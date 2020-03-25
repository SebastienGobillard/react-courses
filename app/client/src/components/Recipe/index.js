import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

//Local imports
import './styles.scss';


const Recipe = () => {
   
    return  <div className="mainContainer">
            <p className="navigation">▶ Accueil ▶ Mes recettes</p>

            <div className="wip">Patience, la fonctionnalité recette sera bientôt cuite ! Euh... prête !
            </div>

                <div className="mainContent"><a href="">
                    <div className="title">Lasagnes à l'italienne</div>
                    <div className="lasagnes"> 
                        <div className="summary">
                            <ul className="recipe-items">
                                <li>- 1 Carotte </li>
                                <li>- 1 Branche de céleri </li>
                                <li>- 800gr hâché mélangé </li>
                                <li>- Sauce tomate </li>
                                <li><a>Voir plus</a></li>
                            </ul> 
                        </div>
                    </div>
                    </a>
                </div>

                <div className="mainContent"><a href="">
                    <div className="title">Crêpes au suc'</div>
                    <div className="crepes"> 
                        <div className="summary">
                            <ul className="recipe-items">
                                <li>- 300gr de farine</li>
                                <li>- 3 oeufs</li>
                                <li>- 50gr de beurre fondu</li>
                                <li>- 60cl de lait</li>
                                <li>- Du suc'</li>
                                <li><a>Voir plus</a></li>
                            </ul>
                        </div>    
                    </div>
                    </a>
                </div>

                <div className="mainContent"><a href="">
                    <div className="title">Soupe de légumes</div>
                    <div className="soup"> 
                        <div className="summary">
                                <ul className="recipe-items">
                                    <li>- 4 tomates</li>
                                    <li>- 1 courgette</li>
                                    <li>- 1 oignon</li>
                                    <li>- 1 carotte</li>
                                    <li><a>Voir plus</a></li>
                                </ul>
                        </div>    
                    </div>
                    </a>
                </div>

                <div className="mainContent"><a href="">
                    <div className="title">Pizza maison</div>
                    <div className="pizza"> 
                        <div className="summary">
                                <ul className="recipe-items">
                                    <li>- Mortadelle</li>
                                    <li>- 1 poivron</li>
                                    <li>- 3 champignons</li>
                                    <li>- Mozzarella</li>
                                    <li><a>Voir plus</a></li>
                                </ul>
                        </div>    
                    </div>
                    </a>
                </div>

                <div className="addRecipe"><NavLink id="addRecipeNav" to="/newRecipe">Ajoutez une nouvelle recette</NavLink></div>

            </div>
            
};

export default Recipe;