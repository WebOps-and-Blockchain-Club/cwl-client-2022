// import React from 'react'
// import { Carousel } from 'react-responsive-carousel';
// import '../styles/Carousal.css'

// const CarouselComponent = () => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <Carousel showThumbs={false} transitionTime={1} width='70vw' infiniteLoop={true} interval={2000} autoPlay={true} showStatus={false} showIndicators={false} >
//         <div>
//           <img src={require('../images/image.jpg')} height={'100%'} />
//         </div>
//         <div>
//           <img src={require('../images/image2.png')} height={'100%'} />
//         </div>
//         <div>
//           <img src={require('../images/iamge3.jpg')} height={'100%'} />
//         </div>
//       </Carousel>
//     </div>
//   )
// }

// export default CarouselComponent
import React from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import { style } from '@mui/system';
// import { style } from '@mui/system';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselComponent = () => {
  const onChange = (currentSlide: any) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}>1</h3>
      </div>
      <div>
        <h3 style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}>2</h3>
      </div>
      <div>
        <h3 style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}>3</h3>
      </div>
      <div>
        <h3 style={{
          height: '160px',
          color: '#fff',
          lineHeight: '160px',
          textAlign: 'center',
          background: '#364d79',
        }}>4</h3>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;


