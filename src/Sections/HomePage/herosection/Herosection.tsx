import React, { useEffect, useState } from 'react'
import "./herosection.css"
import { top_brands_data } from '../../../API/top_brands_data';
import { lineBreak } from 'html2canvas/dist/types/css/property-descriptors/line-break';
import { TopBrandsData } from '../../../data';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';
import { useSelector } from 'react-redux';

const Herosection = () => {

    const [list, setList] = useState<TopBrandsData[]>();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState<string>('');
    const  debounceSearchTerm = useDebounce(searchText, 300);

    const {TopBrandsSlice, loading, error} = useSelector((state: {topBrands: {TopBrandsSlice: TopBrandsData[], loading: boolean, error: string}}) => state.topBrands);

    const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const topBrandsData = TopBrandsSlice;
        const value = event.target.value
        setSearchText(event.target.value)
        await new Promise(resolve => (setTimeout(()=>{
            const nikunj: TopBrandsData[] = topBrandsData.filter((data) => (
                data.name.toLowerCase().includes(event.target.value.toLowerCase())
            ))
            if(value) setList(nikunj)
            else setList([])
        },500), resolve));
        
    }

    // useEffect(() => {
    //     const topBrandsData = top_brands_data;
    //     if(debounceSearchTerm){
    //         const nikunj: TopBrandsData[] = topBrandsData.filter((data) => (
    //             data.name.toLowerCase().includes(debounceSearchTerm.toLowerCase())
    //         ))
    //         if(debounceSearchTerm !== ""){
    //             setList(nikunj);
    //         }
    //         else{
    //             setList([]);
    //         }
    //     }
    // }, [debounceSearchTerm]);

    return (
        <div className="header" id="header">
            <header className="header_content">
                <section className="header_main_content">
                    <span className="header_title">NOODLETOWN</span>
                    <span className="header_desc">Discover best food around you</span>
                    <div className="header_searchbar">
                        <select name="place" id="place">
                            <option value="surat" selected>Surat</option>
                            <option value="ahemdabad">Ahemdabad</option>
                            <option value="vadodara">Vadodara</option>
                        </select>
                        <hr id="searchbar_hr" />
                        <div className="searchbar_right">
                            <label htmlFor="searchbar">
                                <img id="search_icon"
                                    src="https://th.bing.com/th/id/OIP.RF8hdNm5eOnLDpG_GSu5NwHaHN?rs=1&pid=ImgDetMain"
                                    alt="" />
                            </label>
                            <input type="text" id="searchbar" placeholder="Search for restaurant, cuisine, place" onChange={changeHandler} />
                        </div>
                    </div>
                    <div className="searching_container">
                        {
                            list?.map((item) => (
                                <div className='searching_item' onClick={() => navigate(`/detail?brand=${item.name}`)}>{item.name}</div>
                            ))
                        }
                    </div>
                </section>
            </header>
        </div>
    )
}

export default Herosection