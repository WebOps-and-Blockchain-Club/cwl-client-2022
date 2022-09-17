import React from 'react'
import { Carousel } from 'react-responsive-carousel'
const CarouselComponent = () => {
  return (
    <>
      <Carousel>
        <div>
          <img src='public/Chennai_Waterlogging1.jpg' />
        </div>
        <div>
          <img src='public/snakes.jpg' />
        </div>
      </Carousel>
    </>
  )
}

export default CarouselComponent
