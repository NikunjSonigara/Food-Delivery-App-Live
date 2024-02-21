import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollTop.css';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button className='scroll_btn' style={{ transform: visible ? 'scale(1)' : 'scale(0)' }} >
            <FaArrowUp onClick={scrollToTop} className='arrow'
                style={{ transform: visible ? 'scale(1)' : 'scale(0)' }} />
        </button>
    );
}

export default ScrollButton; 
