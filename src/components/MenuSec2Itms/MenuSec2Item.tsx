import { FC } from 'react'
import { CartData, MenuSec2Data, PostData } from '../../data'
import './MenuSec2Item.css'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../redux/slices/CartSlice'
import toast from 'react-hot-toast'

const MenuSec2Item : FC<{item: PostData}> = ({item}) => {

  const cart: CartData[] = useSelector((state: {cart: CartData[]}) => state.cart);
  const dispatch = useDispatch();

  const addToCart = () => {
    const stateItem = cart.filter(i => i.id === item.id);
    const { id, image, name, description, price, food_type, time, popular } = item;
    const quantity = 1;
    if (stateItem.length > 0 && stateItem[0].quantity < 5) {
      dispatch(add({ id, image, name, description, price, quantity, food_type, time, popular }));
      toast.success(`${item.name} Added to Cart`);
    } 
    else if (stateItem.length === 0) {
      dispatch(add({ id, image, name, description, price, quantity, food_type, time, popular }));
      toast.success(`${item.name} Added to Cart`);
    } 
    else {
      toast.error(`Can't Add More than 5 ${item.name}`);
    }
  }

  return (
    <div className="menu_page_content2_box" onClick={addToCart}>
        <img src={item.image} alt="" className="menu_page_content2_box_img" />
        <span className="menu_page_content2_box_name">{item.name}</span>
        <span className="menu_page_content2_box_time">{item.time}</span>
    </div>
  )
}

export default MenuSec2Item