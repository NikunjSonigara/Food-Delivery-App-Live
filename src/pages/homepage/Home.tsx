import Herosection from '../../Sections/HomePage/herosection/Herosection'
import DownloadOurApp from '../../Sections/HomePage/DownloadOurApp/DownloadOurApp'
import SocialMedia from '../../Sections/HomePage/SocialMediaSec/SocialMedia'
import OfferSec from '../../Sections/HomePage/OfferSec/OfferSec'
import FastestFoodBanner from '../../Sections/HomePage/FastestFoodBanner/FastestFoodBanner'
import PopulerRecipesLists from '../../Sections/HomePage/PopulerRecipes/PopulerRecipesLists'
import OurBestDeliver from '../../Sections/HomePage/OurBestDeliverse/OurBestDeliver'
import DiningOut from '../../Sections/HomePage/DiningOut/DiningOut'
import ScrollButton from '../../components/ScrollTop/ScrollTop'

const Home = () => {
  return (
    <div>
        <Herosection/>
        <DiningOut/>
        <OurBestDeliver/>
        <PopulerRecipesLists/>
        <FastestFoodBanner/>
        <OfferSec/>
        <SocialMedia/>
        <DownloadOurApp/>
        <ScrollButton/>
    </div>
  )
}

export default Home