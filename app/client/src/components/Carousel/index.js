
import React from 'react';
import { Slide } from 'react-slideshow-image';
import './carousel.sass';

import Janvier from '../Season/Janvier.jpg';
import Février from '../Season/Février.jpg';
import Mars from '../Season/Mars.jpg';
import Avril from '../Season/Avril.jpg';
import Mai from '../Season/Mai.jpg';
import Juin from '../Season/Juin.jpg';
import Juillet from '../Season/Juillet.jpg';
import Aout from '../Season/Aout.jpg';
import Septembre from '../Season/Septembre.jpg';
import Octobre from '../Season/Octobre.jpg';
 
const proprietes = {
  duration: 100000000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
}

const Carousel = () => {


  return (

    <div className="containerSlide">
      <Slide {...proprietes}>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Janvier} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Février} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Mars} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Avril} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Mai} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Juin} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Juillet} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Aout} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Septembre} />
          </div>        
        </div>
        <div className="each-slide">
          <div>
            <img className="img-carousel" src={Octobre} />
          </div>        
        </div>
      </Slide>
    </div>
  )
}

export default Carousel;
