import TopBrand from '../../Sections/MenuPage/TopBrand/TopBrand'
import FoodAccordingWeather from '../../Sections/MenuPage/FoodAccordingWeather/FoodAccordingWeather'
import NearPlaces from '../../Sections/MenuPage/NearPlaces/NearPlaces'
import ScrollButton from '../../components/ScrollTop/ScrollTop'

const Menu = () => {
  return (
    <div className='w-full flex flex-col items-center mb-20'>
        <TopBrand/>
        <FoodAccordingWeather/>
        <NearPlaces/>
        <ScrollButton/>
    </div>
  )
}

export default Menu