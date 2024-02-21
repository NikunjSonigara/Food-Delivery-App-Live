import { useDispatch, useSelector } from "react-redux"
import { CartData, CoupanCode } from "../../data"
import "./CartPage.css"
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItems/CartItem";
import { coupan_code } from "../../API/coupan_code";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { removeAll } from "../../redux/slices/CartSlice";
import { IoMdClose } from "react-icons/io";
import ScrollButton from "../../components/ScrollTop/ScrollTop";

const CartPage = () => {

    const cart: CartData[] = useSelector((state: any) => state.cart);
    const login = useSelector((state: any) => state.login);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [discount, setDiscount] = useState(0);
    const [finalAmmount, setFinalAmount] = useState(0);
    const [invalid, setInvalid] = useState(false);
    const [receiptShow, setReceiptShow] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [coupanCode, setCoupanCode] = useState("");

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoupanCode(event.target.value);
    }

    const discountHandler = () => {
        // console.log("Im in discount handler");
        if (discount === 0) {
            // console.log("0 che");
            let dis = 0;
            try {
                const coupanCodeData: CoupanCode = coupan_code;
                if (coupanCodeData[coupanCode]) {
                    dis = coupanCodeData[coupanCode];
                    // console.log(dis);
                    setInvalid(false);
                }
                else{
                    setInvalid(true);
                }
            }
            catch (e) {
                console.log("Error avi gy Coupan code leva ma.");
            }
            setDiscount(dis);
        }
        else {
            setDiscount(0);
        }
    }

    const orderNowHandler = async () => {
        // await displayRazorpay(finalAmmount);
        setReceiptShow(true);
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        
        // Heading
        doc.setFontSize(14);
        doc.setFillColor(255, 255, 204); // Light Yellow
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        // Heading
        doc.setFontSize(25);
        doc.setTextColor(0, 0, 0); // Black
        doc.text('Noodletown', 10, 20);
    
        // User email
        doc.setFontSize(20);
        doc.text(`${login.userData.email}`, 10, 35);
        // Line
        const nameLineYPos = 40;
        doc.setLineWidth(0.5);
        doc.line(10, nameLineYPos, doc.internal.pageSize.getWidth() - 10, nameLineYPos);
    
        // Space after line
        const yPosAfterLine = nameLineYPos + 5;
        doc.text(`\n`, 10, yPosAfterLine);
    
        doc.setFontSize(14);
        
        // Table headers
        const tableHeaders = ['Food Name', 'Quantity', 'Price', 'Total'];
        const xPos = 10;
        const yPosHeader = 50;
        const cellWidth = [110, 30, 30, 30]; // Widths for each column
        tableHeaders.forEach((header, index) => {
            doc.text(header, xPos + cellWidth.slice(0, index).reduce((acc, cur) => acc + cur, 0), yPosHeader);
        });
        
        // Table data
        let yPosTableData = yPosHeader + 10;
        let totalAmount = 0;
        let currentPage = 1;
    
        // Function to add a new page and reset y-position
        const addNewPage = () => {
            doc.addPage();
            yPosTableData = yPosHeader + 10;
            currentPage++;
            // Reset the background color for the new page
            doc.setFillColor(255, 255, 204); // Light Yellow
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
        };
    
        cart.forEach((item, index) => {
            // Check if new page is needed
            if (index > 0 && index % 23 === 0) {
                addNewPage();
            }
    
            const total = item.quantity * parseFloat(item.price);
            const wrappedText = wrapText(`${index+1}. ${item.name}`, cellWidth[0] - 5, doc);
            const tableRow = [wrappedText, item.quantity, parseFloat(item.price).toFixed(2), total.toFixed(2)];
            tableRow.forEach((cell, cellIndex) => {
                doc.text(cell.toString(), xPos + cellWidth.slice(0, cellIndex).reduce((acc, cur) => acc + cur, 0), yPosTableData);
            });
            yPosTableData += 10;
            totalAmount += total;
        });
        
        // Total, Discount, Amount to pay
        const yPosFooter = yPosTableData + 10;
        doc.setLineWidth(0.5);
        doc.line(10, nameLineYPos, doc.internal.pageSize.getWidth() - 10, nameLineYPos);
        doc.text('Total', xPos, yPosFooter + 10);
        doc.text(`Discount ${discount ? `(${coupanCode})` : ''}`, xPos, yPosFooter + 20);
        doc.text('Amount to pay', xPos, yPosFooter + 30);
        doc.text(totalAmount.toFixed(2), xPos + 170, yPosFooter + 10);
        doc.text(discount.toFixed(2), xPos + 170, yPosFooter + 20);
        doc.text((totalAmount - discount).toFixed(2), xPos + 170, yPosFooter + 30);
    
        // Save and reset
        doc.save('receipt.pdf');
        dispatch(removeAll(cart));
        setReceiptShow(false);
    };
    
    const wrapText = (text: string, maxWidth: number, doc: any) => {
        const words = text.split(' ');
        let lines: string[] = [];
        let currentLine = '';
    
        words.forEach(word => {
            const width = doc.getStringUnitWidth(`${currentLine} ${word}`) * 12 / doc.internal.scaleFactor;
            if (width <= maxWidth) {
                currentLine += ` ${word}`;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });
    
        lines.push(currentLine);
        return lines.join('\n');
    };

    const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }

            document.body.appendChild(script);
        })
    }

    const displayRazorpay = async (amount: number) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            alert("Faild to load Razorpay...");
            return ;
        }

        const options = {
            key: "rzp_test_pqd9pI22OPd0Ry",
            currency: "INR",
            amount: amount,
            name: "Noodletown",
            description: "Kem bhai maja avi ne",
            image: "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png",

            handler: function (responce: any) {
                alert(responce.razorpay_payment_id);
                alert("Payment Successfully")
            },

            prefill: {
                name: "Noodletown"
            }
        };

        // const paymentObject = new window.Razorpay(options);
        // paymentObject.open();
    }
    

    const close = () => {
        dispatch(removeAll(cart));
        setReceiptShow(false);
    }

    useEffect(() => {
        let sum = cart.reduce((prev: number, curr: CartData) => prev + parseInt(curr.price) * curr.quantity, 0);
        setTotalAmount(sum);
        if (sum - discount < 0) {
            setFinalAmount(0);
        }
        else {
            setFinalAmount(sum - discount);
        }
    }, [cart, discount]);

    return (
        <div className="shopping_cart_page">
            <div className="shopping_card_page_content1">
                <span className="shopping_card_page_content1_title">
                    Your Cart
                </span>
                {
                    cart.length === 0 ?
                        (
                            <div className="flex flex-col items-center justify-center">
                                <img src="https://st5.depositphotos.com/30046358/65107/v/450/depositphotos_651076536-stock-illustration-food-delivery-teen-worker-eating.jpg" className="h-[50vh]" alt="" />
                                <Link to='/menu'>
                                    <button className="w-[180px] border-[1px] bg-[color:var(--shopping-cart-yellow-color)] p-2 text-white font-medium rounded-sm mt-4">Go For Food</button>
                                </Link>
                            </div>
                        ) : (
                            <div className={receiptShow ? `shopping_card_page_content1_flex_fix` : `shopping_card_page_content1_flex`}>
                                <div className="shopping_card_page_content1_items_div">
                                    {
                                        cart.map((item: CartData) => (
                                            <CartItem key={item.id} item={item} />
                                        ))
                                    }
                                </div>
                                <div className="shopping_card_page_content1_sidebar">
                                    <div className="shopping_card_page_content1_sidebar_box">
                                        <span className="shopping_card_page_content1_sidebar_title">Total</span>
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Total Amount</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">₹{totalAmount}</span>
                                        </div>
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Discount</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">- ₹{discount}</span>
                                        </div>
                                        <hr className="shopping_card_page_content1_sidebar_hr" />
                                        <div className="shopping_card_page_content1_sidebar_box_total_amount">
                                            <span className="shopping_card_page_content1_sidebar_box_total">Amount to Paid</span>
                                            <span className="shopping_card_page_content1_sidebar_box_amount">₹{finalAmmount}</span>
                                        </div>
                                        {invalid && <p className="text-sm text-red-500">Invalid Coupan code</p>}
                                        <div className="shopping_card_page_content1_sidebar_box_coupan_code_box">
                                            {discount ? <input type="text" className="shopping_card_page_content1_sidebar_box_coupan_code"
                                                placeholder="Apply coupan code" onChange={changeHandler} readOnly />
                                                : <input type="text" className="shopping_card_page_content1_sidebar_box_coupan_code"
                                                    placeholder="Apply coupan code" onChange={changeHandler} />
                                            }
                                            {discount ?
                                                <button className="shopping_card_page_content1_sidebar_box_coupan_code_button" onClick={discountHandler}>Remove</button>
                                                : <button className="shopping_card_page_content1_sidebar_box_coupan_code_button" onClick={discountHandler}>Apply</button>
                                            }
                                        </div>
                                        <button className="shopping_card_page_content1_sidebar_box_order_now_button" onClick={orderNowHandler}>Order Now</button>
                                    </div>
                                </div>
                                <div className={`${receiptShow ? "receipt_main" : "receipt_main_none"}`} onClick={close}>
                                    <div className={`${receiptShow ? "receipt" : "receipt_none"}`}>
                                        <IoMdClose className="absolute right-3 top-3 text-2xl cursor-pointer" onClick={close} />
                                        <div className="receipt_box">
                                            <img src="https://i.gifer.com/origin/11/1184b4c0aa977f925dde58d2075772dd.gif" alt="" />
                                            <p className="orderdone">Order Successful</p>
                                        </div>
                                        <button className="download" onClick={downloadPDF}>Download Receipt</button>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
            <ScrollButton/>
        </div>
    )
}

export default CartPage