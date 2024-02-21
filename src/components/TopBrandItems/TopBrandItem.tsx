import { FC } from 'react'
import './TopBrandItem.css'
import { TopBrandsData } from '../../data'
import { useNavigate } from 'react-router-dom'

const TopBrandItem : FC<{item: TopBrandsData}> = ({item}) => {

  const navigat = useNavigate();

  const clickHandler = (brand: string) => {
    // navigat({search: `brand=${brand}`})
    navigat(`/detail?brand=${brand}`)
  }

  return (
    <div className="menu_page_content1_box cursor-pointer scrollnone" onClick={() => clickHandler(item.name)}>
        <img src={item.image} alt="" className="menu_page_content1_box_img"/>
        <span className="menu_page_content1_box_name">{item.name}</span>
    </div>
  )
}

export default TopBrandItem