import "./PopulerRecipesList.css"
import { useEffect, useState } from "react"
import { CartData, PostData, TopBrandsData } from "../../../data";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../../redux/slices/CartSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { MdNavigateNext } from "react-icons/md";

const PopulerRecipesLists = () => {

    const [list, setList] = useState<string[] | null>(null);
    const [items, setItems] = useState<PostData[]>([]);
    const [selected, setSelected] = useState<string>("");
    const [visible, setVisible] = useState<number>(5);
    const cart: CartData[] = useSelector((state: { cart: CartData[] }) => state.cart);
    const { TopBrandsSlice, loading, error } = useSelector((state: { topBrands: { TopBrandsSlice: TopBrandsData[], loading: boolean, error: string } }) => state.topBrands);
    const dispatch = useDispatch();

    const getPopulerRecipesData = (data: string | null): void => {
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
            const foodsData = removeDuplicates(foodsDataWithDuplicates.flat());
            const foodsName: string[] = [];
            foodsData.forEach((element: PostData) => {
                foodsName.push(element.food_type);
            });
            const foodsNameList: string[] = Array.from(new Set(foodsName));
            setList(foodsNameList);
            setSelected(data || foodsNameList[0]);
            const filteredItems: PostData[] = foodsData.filter((item: PostData) => item.food_type === (data || foodsNameList[0]));
            setItems(filteredItems);
            filteredItems.length > 5 ? setVisible(5) : setVisible(filteredItems.length);
        }
        catch (e) {
            console.log("Populer List levama error avi gy.");
        }
    }

    const removeDuplicates = (foodsArray: any) => {
        const uniqueIds = new Set();
        let uniqueIndex = 0;

        for (let i = 0; i < foodsArray.length; i++) {
            const id = foodsArray[i].id;
            if (!uniqueIds.has(id)) {
                uniqueIds.add(id);
                if (uniqueIndex !== i) {
                    foodsArray[uniqueIndex] = foodsArray[i];
                }
                uniqueIndex++;
            }
        }

        foodsArray.splice(uniqueIndex);

        return foodsArray;
    }

    const addToCart = (item: PostData) => {
        const { id, image, name, description, price, food_type, popular, time } = item;
        const quantity = 1;
        dispatch(add({ id, image, name, description, price, quantity, food_type, popular, time }));
    };

    const removeFromCart = (id: string) => {
        dispatch(remove(id));
    };

    useEffect(() => {
        getPopulerRecipesData(null);
    }, []);

    return (
        <div className="popular_recipes">
            <div className="popular_recipes_header">
                <img id="popular_recipes_header_img" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Group%205.png" alt="" />
                <span id="popular_recipes_header_name">Popular Recipes</span>
                <img id="popular_recipes_header_img" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Vector.png" alt="" />
            </div>
            <div className="popular_recipes_lists">
                {
                    list?.map((item: string, index: number) => (
                        <button className={`${item === selected ? "selected" : ""} popular_recipes_button`} key={index} onClick={() => getPopulerRecipesData(item)}>
                            {item}
                        </button>
                    ))
                }
            </div>
            <div className="popular_recipes_box_list">
                {
                    !loading ?
                        items?.slice(0, visible).map((item: PostData, index) => cart.some(i => i.id === item.id) ? (
                            <div key={index} className="popular_recipes_main_box">
                                <div className="popular_recipes_box">
                                    <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                        src={item.image} alt="Pizza" /></div>
                                    <div className="popular_recipes_subbox">
                                        <span id="popular_recipes_box_name">{item.name}</span>
                                        <span id="popular_recipes_box_time">{item.time}</span>
                                    </div>
                                    <span id="popular_recipes_box_address">{item.description}</span>
                                    <span id="popular_recipes_box_price">₹{item.price}</span>
                                    <div className={`${true ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => removeFromCart(item.id)}>
                                        <GiShoppingBag className={`${true ? "text-white" : "text-black"}`} />
                                    </div>
                                    {item.popular &&
                                        <div className="popular_recipes_tag">
                                            <p>Popular</p>
                                        </div>
                                    }
                                    <div className="popular_recipes_box_center_border">
                                    </div>
                                    <div className="popular_recipes_circle_center_border"></div>
                                </div>
                            </div>
                        ) : <div key={index} className="popular_recipes_main_box">
                            <div className="popular_recipes_box">
                                <div className="popular_recipes_box_image"><img id="popular_recipes_box_img"
                                    src={item.image} alt="Pizza" /></div>
                                <div className="popular_recipes_subbox">
                                    <span id="popular_recipes_box_name">{item.name}</span>
                                    <span id="popular_recipes_box_time">{item.time}</span>
                                </div>
                                <span id="popular_recipes_box_address">{item.description}</span>
                                <span id="popular_recipes_box_price">₹{item.price}</span>
                                <div className={`${false ? "popular_recipes_box_circle" : "popular_recipes_box_circle_false"}`} onClick={() => addToCart(item)}>
                                    <GiShoppingBag className={`${false ? "text-white" : "text-black"}`} />
                                </div>
                                {item.popular &&
                                    <div className="popular_recipes_tag">
                                        <p>Popular</p>
                                    </div>
                                }
                                <div className="popular_recipes_box_center_border">
                                </div>
                                <div className="popular_recipes_circle_center_border"></div>
                            </div>
                        </div>) : <Spinner />
                }
                { visible < items.length && <div className="next_arrow">
                    <MdNavigateNext className="next_arrow_icon" onClick={() => setVisible(prev => prev+3)}/>
                </div>}
            </div>
        </div>
    )
}

export default PopulerRecipesLists