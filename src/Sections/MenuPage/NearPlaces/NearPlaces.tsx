import { useState, useEffect } from "react";
import { menu_sec3 } from "../../../API/menu_sec3";
import { MenuSec3Data } from "../../../data";
import MenuSec3Item from "../../../components/MenuSec3Item/MenuSec3Item";
import './NearPlaces.css'
import { useSelector } from "react-redux";
import { initialPlacesProps } from "../../../redux/slices/PlacesNearYouSlice";

const MenuSec3 = () => {

    const [data, setData] = useState<MenuSec3Data[] | null>(null);
    const {placesData, loading, error} = useSelector((state: {place: initialPlacesProps}) => state.place);

    const getMenuSec3Data = () => {
        try{
            const data: MenuSec3Data[] = placesData;
            setData(data);
        }
        catch(e){
            console.log("Error avi gy TOP_BRANDS_DATA");
        }
    }

    useEffect(() => {
        getMenuSec3Data();
    }, []);

  return (
    <div className='menu_page_content3'>
        <div className='menu_page_content3_box_grid'>
            {
                data?.map((item: MenuSec3Data) => (<MenuSec3Item key={item.id} item={item} />))
            }
        </div>
    </div>
  )
}

export default MenuSec3