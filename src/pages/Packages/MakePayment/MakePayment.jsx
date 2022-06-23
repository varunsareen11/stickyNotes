import React from 'react';
import '../style.css';

function MakePayment() {
    return (
        <>
            <div className='body-wrap'>
                <div className='ctm-container'>
                    <div className='pack-cmn_heading'>
                        <img src="/assets/images/large-logo.png" alt="Large Logo" />
                        <h2>Make Payment</h2>
                    </div>
                    <div className='big-card paymentWrap'>
                        <div className='paymentBoxform'>

                        </div>
                        <div className='paymentBoxInfo'>
                            <h4><span>Product:</span> Starter Package</h4>
                            <ul className='paymentInfoList'>
                                <li><span>Price</span><span>€3.99</span></li>
                                <li><span>Taxes</span><span>€0.00</span></li>
                                <li><span>Total</span><span>€3.99</span></li>
                            </ul>
                            <img src="/assets/images/secure-payment-icon.png" alt="Secure Payment Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakePayment