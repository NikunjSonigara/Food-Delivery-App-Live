import "./OutBestDeliver.css"

const OurBestDeliver = () => {
    return (
        <div className="content2">
            <span className="content2_title">
                Our best delivered cuisines
            </span>
            <span className="content2_desc">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore
                et dolore
            </span>
            <div className="content2_box">
                <div className="content2_card content2_card1">
                    <img id="content2_card_image" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Ellipse%201.png" alt="" />
                    <span id="content2_card_name">Chicken Noodles</span>
                </div>
                <hr id="content2_hr" />
                <div className="content2_card content2_card2">
                    <img id="content2_card_image" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Ellipse%202.png" alt="" />
                    <span id="content2_card_name">French Fries</span>
                </div>
                <hr id="content2_hr" />
                <div className="content2_card content2_card3">
                    <img id="content2_card_image" src="https://nikunjsonigara.github.io/Food-Delivery-App-PT/image/Ellipse%203.png" alt="" />
                    <span id="content2_card_name">Avacado Mint Noodles</span>
                </div>
            </div>
        </div>
    )
}

export default OurBestDeliver