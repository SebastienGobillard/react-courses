import React from 'react';
import { Icon } from 'semantic-ui-react';

const CreatedList = (props) => {

    console.log(props.itemList, props.rackList);
{/* A factoriser ! via un map? */}
        {/* Bloc de catégorie */}
        return <div className="category">
        <h3>Surgelés</h3>
            <ul className="items">
                <li>
                    <ul className="itemDetails">
                    <li>
                        <span className="categoryInput name">Poisson Pané</span>
                        <span className="categoryInput quantity">4</span>
                        <span className="categoryInput favorite"><Icon name="star outline" /> <Icon name="delete" /></span>
                        
                    </li>
                    </ul>
                </li>

                <li>
                    <ul className="itemDetails">
                        <li>
                            <span className="categoryInput name">Pizza Reine</span>
                            <span className="categoryInput quantity">1</span>
                            <span className="categoryInput favorite"><Icon name="star outline" /* Methode onclic pour changer la className et passer l'étoile en pleine si favori */ /> <Icon name="delete" /></span>
                        </li>
                    </ul>
                </li>

            </ul>
    </div>

}

export default CreatedList;