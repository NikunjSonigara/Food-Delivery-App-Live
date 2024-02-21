import { FC, useEffect, useState } from 'react'
import { PostData, TopBrandsData } from '../../../data'
import OnlineOrderItem from '../OnlineOrderItems/OnlineOrderItem';
import Spinner from '../../../components/Spinner/Spinner';
import './OnlineOrder.css';

const OnlineOrder: FC<{ data: TopBrandsData | null }> = ({ data }) => {

    const [orderList, setOrderList] = useState<string[]>();
    const [orderListData, setOrderListData] = useState<PostData[] | null>(null);
    const [selected, setSelected] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const setAllData = (str?: string | null) => {
        setLoading(true);
        if (data?.food && data.food.length > 0) {
            const firstFood = data.food[0];
            const firstTitle = firstFood.title;
            const x = str || firstTitle;
            setSelected(x);
            const a = data?.food.filter((i) => i.title === x);
            setOrderList(data?.food.map((i) => i.title));
            if (a.length) {
                const b = a[0];
                setOrderListData(b.food_items || firstTitle);
            }
            else {
                console.log("error avi gy bhai onlineOrder.tsx ma");
            }
        }
        else {
            // console.log("Online Order ma data nthi");
        }
        setLoading(false);
    }

    useEffect(() => {
        setAllData();
    }, [data])

    return (
        <div className='order_container'>
            <div className='order_list'>
                {
                    orderList?.map((str, index) => (
                        <button key={index} onClick={() => setAllData(str)} className={`${selected === str ? 'bg-[color:var(--yellow-color)] text-white' : ''} p-3 w-full text-xl flex items-center justify-start hover:bg-[color:var(--yellow-color)] hover:text-white text-start`}>{str}</button>
                    ))
                }
            </div>
            <div className='order_hr'></div>
            <div className="popular_recipes_list">
                {
                    orderList?.map((item: string, index: number) => (
                        <button className={`${item === selected ? "selected" : ""} popular_recipes_button`} key={index} onClick={() => setAllData(item)}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className='order_item_container'>
                <p className='order_item_name'>{selected}</p>
                <div className='order_item_div scrollnone'>
                    {
                        loading ? <Spinner/> :
                        orderListData?.map((item) => (
                            <OnlineOrderItem key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OnlineOrder