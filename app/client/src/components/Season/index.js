import React from 'react';
import { Responsive } from 'semantic-ui-react';

//Local imports
import './styles.scss';
import Janvier from 'src/components/Season/Janvier.jpg';
import Février from 'src/components/Season/Février.jpg';
import Mars from 'src/components/Season/Mars.jpg';
import Avril from 'src/components/Season/Avril.jpg';
import Mai from 'src/components/Season/Mai.jpg';
import Juin from 'src/components/Season/Juin.jpg';
import Juillet from 'src/components/Season/Juillet.jpg';
import Aout from 'src/components/Season/Aout.jpg';
import Septembre from 'src/components/Season/Septembre.jpg';
import Octobre from 'src/components/Season/Octobre.jpg';



const Season = () => {
   
    return  <div className="mainContainer">
            <p className="navigation">▶ Accueil ▶ Mes fruits et légumes de saison</p>
                <div className="mainContent">
                    <a href="">
                    <div className="title">Janvier</div>
                    <img className="box-img" src={Janvier}></img> 
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>
            
                <div className="mainContent">
                    <a href="">
                    <div className="title">Février</div>
                    <img className="box-img" src={Février}></img>
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>

                <div className="mainContent">
                    <a href="">
                    <div className="title">Mars</div>
                    <img className="box-img" src={Mars}></img>
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>

                <div className="mainContent">
                    <a href="">
                    <div className="title">Avril</div>
                    <img className="box-img" src={Avril}></img>
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>

                <div className="mainContent">
                    <a href="">
                    <div className="title">Mai</div>
                    <img className="box-img" src={Mai}></img>
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>

                <div className="mainContent">
                    <a href="">
                    <div className="title">Juin</div>
                    <img className="box-img" src={Juin}></img>
                        <Responsive minWidth={1024}>
                        </Responsive>
                    </a>
                </div>

            <div className="mainContent">
                <a href="">
                <div className="title">Juillet</div>
                <img className="box-img" src={Juillet}></img>
                    <Responsive minWidth={1024}>
                    </Responsive>
                </a>
            </div>

            <div className="mainContent">
                <a href="">
                <div className="title">Aout</div>
                <img className="box-img" src={Aout}></img>
                    <Responsive minWidth={1024}>
                    </Responsive>
                </a>
            </div>

            <div className="mainContent">
                <a href="">
                <div className="title">Septembre</div>
                <img className="box-img" src={Septembre}></img>
                    <Responsive minWidth={1024}>
                    </Responsive>
                </a>
            </div>

            <div className="mainContent">
                <a href="">
                <div className="title">Octobre</div>
                <img className="box-img" src={Octobre}></img>
                    <Responsive minWidth={1024}>
                    </Responsive>
                </a>
            </div>

            </div>
};

export default Season;