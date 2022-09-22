import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import '../styles/Carousal.css'

const CarouselComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Carousel showThumbs={false} transitionTime={1} width='70vw' infiniteLoop={true} interval={2000} autoPlay={true} showStatus={false} showIndicators={false} >
        <div>
          <img src={require('../images/image.jpg')} height={'100%'} />
        </div>
        <div>
          <img src={require('../images/image2.png')} height={'100%'} />
        </div>
        <div>
          <img src={require('../images/iamge3.jpg')} height={'100%'} />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselComponent
