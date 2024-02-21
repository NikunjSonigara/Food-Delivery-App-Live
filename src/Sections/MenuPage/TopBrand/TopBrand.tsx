import { useEffect, useState } from 'react'
import { top_brands_data } from '../../../API/top_brands_data'
import TopBrandItem from '../../../components/TopBrandItems/TopBrandItem';
import { TopBrandsData } from '../../../data';
import './TopBrand.css'
import { useSelector } from 'react-redux';

const TopBrand = () => {

    const [topBrandsData, setTopBrandsData] = useState<TopBrandsData[] | null>(null);
    const {TopBrandsSlice, loading, error} = useSelector((state: {topBrands: {TopBrandsSlice: TopBrandsData[], loading: boolean, error: string}}) => state.topBrands);

    const getTopBrandsData = () => {
        try{
            const data: TopBrandsData[] = TopBrandsSlice;
            setTopBrandsData(data);
        }
        catch(e){
            console.log("Error avi gy TOP_BRANDS_DATA");
        }
    }

    useEffect(() => {
        getTopBrandsData();
    }, []);

  return (
    <div className='pt-28 w-[90%]'>
        <span className="menu_page_content1_title">Top brands for you</span>
        <div className='flex mt-8 overflow-x-auto gap-4 justify-between scrollnone'>
            {
                topBrandsData?.map((item:TopBrandsData, index) => (<TopBrandItem key={index} item={item} />))
            }
        </div>
    </div>
  )
}

export default TopBrand