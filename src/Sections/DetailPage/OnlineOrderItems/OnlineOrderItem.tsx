import { FC, useEffect, useState } from 'react';
import { CartData, PostData } from '../../../data';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, updateQuantity } from '../../../redux/slices/CartSlice';
import toast from 'react-hot-toast';
import './OnlineOrderItem.css';

const OnlineOrderItem: FC<{ item: PostData }> = ({ item }) => {
    const cart: CartData[] = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    const [qun, setQun] = useState(1);

    const getItemFromCart = () => {
        const cartItem = cart.find(i => i.id === item.id);
        const q = cartItem?.quantity;
        setQun(q || 0);
    };

    const increment = () => {
        if (qun < 5) {
            setQun(prev => {
                const newQuntity = prev + 1;
                dispatch(updateQuantity({ id: item.id, quantity: newQuntity }));
                return newQuntity;
            })
        }
        else {
            toast.error(`Can't Add More than 5 ${item.name}`);
        }
    };

    const decrement = () => {
        setQun(prev => {
            const newQuntity = prev - 1;
            if (newQuntity < 1) {
                removeFromCart();
            }
            else {
                dispatch(updateQuantity({ id: item.id, quantity: newQuntity }));
            }
            return newQuntity;
        })
    };

    const addToCart = () => {
        const { id, image, name, description, price, food_type, popular, time } = item;
        const quantity = 1;
        dispatch(add({ id, image, name, description, price, quantity, food_type, popular, time }));
    };

    const removeFromCart = () => {
        dispatch(remove(item.id));
    };

    useEffect(() => {
        getItemFromCart();
    }, [cart]);

    return (
        <div className='item_div' key={item.id}>
            <img src={item.image} className='item_img' alt="" />
            <div className='item_right'>
                <p className='item_name'>{item.name}</p>
                <p className='item_desc'>{item.description}</p>
                <p className='item_price'>₹{item.price}</p>
                {cart.some(i => i.id === item.id) ? (
                    <div className="shopping_card_page_content1_item_counter">
                        <div className="item_dec_btn" onClick={decrement}>
                            <p className='text-xl'>-</p>
                        </div>
                        <div className="item_text_count">
                            <p className=' text-lg'>{qun}</p>
                        </div>
                        <div className='item_inc_btn' onClick={increment}>
                            <p className='text-xl text-white'>+</p>
                        </div>
                    </div>
                ) : (
                    <button onClick={addToCart} className='item_btn'>Add to Cart</button>
                )}
            </div>
        </div>
    );
};

export default OnlineOrderItem;
