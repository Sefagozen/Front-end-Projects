import Carousel from "react-elastic-carousel";
import Item from "./Item";
import './Carousel.css'
import pic2 from './ProductImages/2.jpg'
import pic3 from './ProductImages/3.jpg'
import pic4 from './ProductImages/4.jpg'
import pic5 from './ProductImages/5.jpg'
import pic6 from './ProductImages/6.jpg'
import pic7 from './ProductImages/7.jpg'
import pic8 from './ProductImages/8.jpg'
import pic9 from './ProductImages/9.jpg'



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow:2, itemsToScroll: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 }
  ];

function Slider (){
return (
<Carousel breakPoints={breakPoints} enableAutoPlay autoPlaySpeed={1500}>
        <Item><img src={pic2} alt="SliderHeadphone2" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic3} alt="SliderHeadphone3" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic4} alt="SliderHeadphone4" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic5} alt="SliderHeadphone5" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic6} alt="SliderHeadphone6" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic7} alt="SliderHeadphone7" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic8} alt="SliderHeadphone8" style={{"height":"250px", "width":"100%"}}></img></Item>
        <Item><img src={pic9} alt="SliderHeadphone9" style={{"height":"250px", "width":"100%"}}></img></Item>
      </Carousel>
      )    
}
export default Slider