import React, { useState } from 'react';
import './style.css';
import packagesData from "../../demo-data/packagesData";

function Packages() {
    const [packData, setPackData] = useState(packagesData);
    console.log(packData);
    return (
        <>
            <div className='body-wrap'>
                <div className='ctm-container'>
                    <div className='pack-cmn_heading'>
                        <img src="assets/images/large-logo.png" alt="Large Logo" />
                        <h2>Our Packages</h2>
                    </div>
                    <div className='packageWrap'>
                        <div className='packageBox'>
                            <h3>Starter</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  book.</p>
                            <h6>This Package Includes:</h6>
                            <ul>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ul>
                            <p className='packagesNote'>*14 Days in the test version after That</p>
                            <h2 className='price'><span>€ 3.99</span>/Month</h2>
                            <button className='ctm-btn'>Book Now</button>
                        </div>
                        <div className='packageBox'>
                            <h3>Starter</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  book.</p>
                            <h6>This Package Includes:</h6>
                            <ul>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ul>
                            <p className='packagesNote'>*14 Days in the test version after That</p>
                            <h2 className='price'><span>€ 3.99</span>/Month</h2>
                            <button className='ctm-btn'>Book Now</button>
                        </div>
                        <div className='packageBox'>
                            <h3>Starter</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  book.</p>
                            <h6>This Package Includes:</h6>
                            <ul>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ul>
                            <p className='packagesNote'>*14 Days in the test version after That</p>
                            <h2 className='price'><span>€ 3.99</span>/Month</h2>
                            <button className='ctm-btn'>Book Now</button>
                        </div>
                        <div className='packageBox'>
                            <h3>Starter</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  book.</p>
                            <h6>This Package Includes:</h6>
                            <ul>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            </ul>
                            <p className='packagesNote'>*14 Days in the test version after That</p>
                            <h2 className='price'><span>€ 3.99</span>/Month</h2>
                            <button className='ctm-btn'>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Packages