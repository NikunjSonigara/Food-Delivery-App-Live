import { FC } from "react"
import "./MenuSec3Item.css"
import { MenuSec3Data } from "../../data"

const MenuSec3Item : FC<{item: MenuSec3Data}> = ({item}) => {
  return (
    <div className="menu_page_content3_box">
        <img src={item.image} alt="" className="menu_page_content3_box_img"/>
        <div className="menu_page_content3_box_img_text">
            <span className="menu_page_content3_box_img_text1">{item.title}</span>
            <span className="menu_page_content3_box_img_text2">{item.description}</span>
        </div>
    </div>
  )
}

export default MenuSec3Item