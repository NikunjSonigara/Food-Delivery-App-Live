import { useEffect, useState } from 'react'
import { PostData, TopBrandsData } from '../../../data';
import MenuSec2Item from '../../../components/MenuSec2Itms/MenuSec2Item';
import './FoodAccordingWeather.css';
import { useSelector } from 'react-redux';

const FoodAccordingWeather = () => {

    const [foodData, setFoodData] = useState<PostData[] | null>(null);
    const {TopBrandsSlice, loading, error} = useSelector((state: {topBrands: {TopBrandsSlice: TopBrandsData[], loading: boolean, error: string}}) => state.topBrands);

    const getMenuSec2Data = () => {
        try {
            const topBrandsData: TopBrandsData[] = TopBrandsSlice;
            const topBrandsFoodData = [];
            for (let i = 0; i < topBrandsData.length; i++) {
                topBrandsFoodData.push(topBrandsData[i].food);
            }
            const foodsDataWithDuplicates = [];
            for (let j = 0; j < topBrandsFoodData.length; j++) {
                for (let k = 0; k < topBrandsFoodData[j].length; k++) {
                    foodsDataWithDuplicates.push(topBrandsFoodData[j][k].food_items)
                }
            }
            const finalans = shuffleArray(removeDuplicates(foodsDataWithDuplicates.flat()));
            setFoodData(finalans.slice(0, 6));
        }
        catch (e) {
            console.log("Error avi gy TOP_BRANDS_DATA");
        }
    }

    const removeDuplicates = (data: PostData[]) => {
        const uniqueIds = new Set(); 
        let uniqueIndex = 0;

        for (let i = 0; i < data.length; i++) {
            const id = data[i].id;
            if (!uniqueIds.has(id)) {
                uniqueIds.add(id);
                if (uniqueIndex !== i) {
                    data[uniqueIndex] = data[i];
                }
                uniqueIndex++;
            }
        }

        data.splice(uniqueIndex);

        return data;
    }

    const shuffleArray = (data: PostData[]) => {
        let currentIndex = data.length, randomIndex;
        while(currentIndex > 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [data[currentIndex], data[randomIndex]] = [data[randomIndex], data[currentIndex]];
        }
        return data;
    }

    useEffect(() => {
        getMenuSec2Data();
    }, []);

    return (
        <div className='menu_page_content2'>
            <span className="menu_page_content2_title">Food according to weather</span>
            <div className='menu_page_content2_box_grid'>
                {
                    foodData?.map((item: PostData) => (<MenuSec2Item key={item.id} item={item} />))
                }
            </div>
        </div>
    )
}

export default FoodAccordingWeather