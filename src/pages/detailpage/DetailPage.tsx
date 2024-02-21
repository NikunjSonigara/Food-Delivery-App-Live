import { useEffect, useState } from 'react'
import OnlineOrder from '../../Sections/DetailPage/OnlineOrder/OnlineOrder'
import { useLocation, useSearchParams } from 'react-router-dom'
import { TopBrandsData } from '../../data';
import Spinner from '../../components/Spinner/Spinner';
import { Popup } from 'reactjs-popup';
import { RWebShare } from 'react-web-share';
import ScrollButton from '../../components/ScrollTop/ScrollTop';
import "./DetailPage.css"
import { useSelector } from 'react-redux';

const DetailPage = () => {

    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<TopBrandsData | null>(null);
    const [img1, setImg1] = useState<string>("");
    const [img2, setImg2] = useState<string>("");
    const [img3, setImg3] = useState<string>("");
    const {TopBrandsSlice, loading, error} = useSelector((state: {topBrands: {TopBrandsSlice: TopBrandsData[], loading: boolean, error: string}}) => state.topBrands);

    const [loadingp, setLoading] = useState(false);

    const getTopBrandsData = async () => {
        setLoading(true);
        try {
            const res: TopBrandsData[] = TopBrandsSlice;
            await new Promise(resolve => setTimeout(resolve, 500));
            const pageData: TopBrandsData[] = res.filter(item => item.name === searchParams.get('brand'));
            setData(pageData[0]);
            const foodItems = pageData[0].food[0].food_items;
            for (let i = 0; i < pageData[0].food.length; i++) {
                if (foodItems.length > 3) {
                    // let randomNumber1 = Math.floor(Math.random());
                    // let randomNumber2 = Math.floor(Math.random());
                    // let randomNumber3 = Math.floor(Math.random());
                    // while (randomNumber1 === randomNumber2){
                    //     randomNumber2 = Math.floor(Math.random());
                    // }
                    // while(randomNumber1 === randomNumber3 || randomNumber2 === randomNumber3){
                    //     randomNumber3 = Math.floor(Math.random());
                    // }
                    setImg1(foodItems[0].image);
                    setImg2(foodItems[1].image);
                    setImg3(foodItems[2].image);
                    break;
                }
            }
        }
        catch (e) {
            console.log("Error Avi gy DetailPage.tsx ma..");
        }
        setLoading(false);
    }

    useEffect(() => {
        getTopBrandsData();
    }, [searchParams, location.search]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
        setIsModalOpen(!isModalOpen);
        // Disable scrolling when modal is open
        if (!isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <div className='detail_main_container'>
            {
                loadingp ? (
                    <div className='loading_container'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='detail_sub_container'>
                        <div className='image_grid'>
                            <img className='image1' src={img1} alt="" />
                            <img className='image2' src={img2} alt="" />
                            <img className='image3' src={img3} alt="" />
                        </div>
                        <div className='detail_main_box'>
                            <div className='detail_main_box_top'>
                                <div>
                                    <img className='logo' src={data?.image} alt="" />
                                </div>
                                <div>
                                    <p className='detail_title'>{data?.name}</p>
                                    <div className='detail_desc_box'>
                                        <p className='detail_desc'>{data?.description}</p>
                                        <p className='detail_desc'>Average Cost: <span className='avg_cost_text'>{data?.average_cost}</span></p>
                                    </div>
                                    <p className='detail_desc_add'>{data?.address}</p>

                                    <p className='detail_desc_add'><span className=' text-green-600'>Open Now</span> {data?.time}</p>
                                    <div className='detail_button_box detail_button_box_lg'>
                                        <button className='detail_button'>Order Online</button>
                                        <a href={`${data?.location}`}><button className='detail_button'>Directions</button></a>
                                        <RWebShare
                                            data={{
                                                text: `Web Share - ${data?.name}`,
                                                url: `${window.location.href}`,
                                                title: `${data?.name}`,
                                            }}
                                            onClick={() =>
                                                console.log("shared successfully!")
                                            }
                                        >
                                            <button className='detail_button'>Share</button>
                                        </RWebShare>
                                    </div>
                                </div>
                            </div>
                            <div className='detail_button_box detail_button_box_sm'>
                                        <button className='detail_button'>Order Online</button>
                                        <a href={`${data?.location}`}><button className='detail_button'>Directions</button></a>
                                        <RWebShare
                                            data={{
                                                text: `Web Share - ${data?.name}`,
                                                url: `${window.location.href}`,
                                                title: `${data?.name}`,
                                            }}
                                            onClick={() =>
                                                console.log("shared successfully!")
                                            }
                                        >
                                            <button className='detail_button'>Share</button>
                                        </RWebShare>
                                    </div>
                            <div className='detail_menu_container'>
                                <p className='detail_menu_title'>Menu</p>
                                <div className='detail_menu_img_container'>
                                    {
                                        data?.menu.map((item) => (
                                            <div className='' key={item.menu_id}>
                                                <Popup trigger={<div><div className='detail_menu_img_div'><img className='detail_menu_img' src={item.menu_image} alt="" /></div>
                                                    <p className='detail_menu_img_name'>{item.menu_name}</p></div>} modal nested onOpen={handleImageClick} onClose={handleImageClick}>
                                                    <div className='bg-transparent'>
                                                        <img src={item.menu_image} alt="" className='h-[80vh]' />
                                                    </div>
                                                </Popup>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='detail_order_container'>
                                <p className='detail_order_title'>Order Online</p>
                                <OnlineOrder data={data} />
                            </div>
                        </div>
                    </div>
                )
            }
            <ScrollButton />
        </div>
    )
}

export default DetailPage