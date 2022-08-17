import React, { useState, useEffect, useRef } from "react";
import './style.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LocationModal from "../../modal/LocationModal/LocationModal";
import CloseIcon from '@mui/icons-material/Close';
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
const API = "http://54.87.14.216/api";

function Locations() {
    // ============================================= Google Map integration ========================================================
    const MyMapComponent = compose(
        withProps({
            /**
             * Note: create and replace your own key in the Google console.
             * https://console.developers.google.com/apis/dashboard
             * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
             */
            googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyBodRG7GRo04w1yrq0qyQ0pj-3fi93ZGoo",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )(props => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
            {props.isMarkerShown && (
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
            )}
        </GoogleMap>
    ));

    // =====================================================================================================
    const [addLocationModal, setAddLocationModal] = useState(false);
    const [viewLocationModal, setViewLocationModal] = useState(false);
    const [editLocationModal, setEditLocationModal] = useState(false);
    const [submitId, setSubmitId] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchTerm] = useState(["company_name"]);
    const [locationData, setLocationData] = useState([]);
    const [createLocationData, setCreateLocationData] = useState({
        company_name: "",
        house_number: "",
        street: "",
        postal_code: "",
        city: "",
        location_image: "",
        location: "",
    });
    const [addLocation, setAddLocation] = useState("");
    const locationHandleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCreateLocationData({ ...createLocationData, [name]: value });
    }
    const addLocationSubmit = (e) => {
        e.preventDefault();
        setCreateLocationData("");
        setAddLocation(createLocationData);
        createLocation(createLocationData);
        setAddLocationModal(false);
    }
    // ============================================= Api Data ========================================================
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const token = getToken?.token;

    // Create Location 
    const createLocation = (data) => {
        console.log("createLocationData", data.city);
        var formdata = new FormData();
        formdata.append("company_name", "test");
        formdata.append("house_number", "10 ");
        formdata.append("street", "oxxford street");
        formdata.append("postal_code", "143550");
        formdata.append("city", "newyork");
        console.log("formdata", formdata);
        return fetch(`${API}/create-location`, {
            method: "POST",
            headers: {
                "x-access-token": token,
            },
            body: formdata,
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json", json);
            })
            .catch((err) => {
                console.log("createLocation", err);
            });
    }

    // Get Location data 
    const getLocationData = (data) => {
        return fetch(`${API}/get-location-data`, {
            method: "GET",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                let reverseTaskList = json;
                setLocationData(reverseTaskList);
            })
            .catch((err) => {
                console.log("getLocationData", err);
            });
    };

    useEffect(() => {
        getLocationData();
    }, []);

    function search(items) {
        return items
            .filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(searchLocation.toLowerCase())
                )
            );
    }

    return (
        <div className="main-body">
            {/* heading */}
            <div className='heading_box'>
                <h2 className="dasshboard_heading">Locations</h2>
                <ul className='breadcrumb'>
                    <li>Dashboard</li>
                    <li className='active'>Locations</li>
                </ul>
            </div>
            {/* Location filterbar */}
            <div className='location-filter'>
                <div className="searchFilter">
                    <input
                        type="text"
                        placeholder="Serarch Location"
                        name="search-Firma"
                        id="search-Firma"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    {/* <svg className="icon" aria-labelledby="Search Icon">
                        <title id="search">Search Icon</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#search"
                            xlinkTitle="Search Icon"
                        ></use>
                    </svg> */}
                </div>
                <div className='btn-group'>
                    <button className='btn cmn_red_bg'> <svg className="icon" aria-labelledby="Remove Item" >
                        <title id="removeItem">Remove Item</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#removeItem"
                            xlinkTitle="Remove Item"
                        ></use>
                    </svg> Delete Location</button>
                    <button className='btn cmn_yellow_bg' onClick={(e) => { setAddLocationModal(true) }}> <svg className="icon" aria-labelledby="Add Item">
                        <title id="addItem">Add Item</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#addItem"
                            xlinkTitle="Add Item"
                        ></use>
                    </svg> Add New Location</button>
                </div>
            </div>

            {/* location Table */}
            <div className='locationTableWrap'>
                <ul className='locationTable'>
                    <li className='locationTableHeading'>
                        <div></div>
                        <div>Sno:</div>
                        <div>Location Name</div>
                        <div>City</div>
                        <div>Actions</div>
                    </li>
                    {
                        search(locationData).map((curelem, index) => {
                            const { company_name, house_number, street, postal_code, city, location_image, location } = curelem;
                            return (
                                <li className='locationTableItem' key={index}>
                                    <div className="location-checkbox">
                                        <div className='ctm-checkbox'>
                                            <label className="ctm-checkbox-container">Merken
                                                <input type="checkbox" />
                                                <span className="ctm-checkbox-checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='location-sr'>{index + 1}</div>
                                    <div className='locationName'>
                                        <img src="assets/images/location-img.png" alt="Location Image" />
                                        <div className='locationNameCont'>
                                            <h6>{company_name && company_name}</h6>
                                            <p>{house_number && house_number} {street && street}</p>
                                        </div>
                                    </div>
                                    <div>{city && city}</div>
                                    <div className='btn-group'>
                                        <button className='btn cmn_yellow_bg' onClick={(e) => { setEditLocationModal(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                            <title id="editItem">Edit Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                xlinkTitle="Edit Item"
                                            ></use>
                                        </svg> Edit</button>
                                        <button className='btn cmn_blue_bg' onClick={(e) => { setSubmitId(curelem._id); setViewLocationModal(true) }}> <svg className="icon" aria-labelledby="View Item">
                                            <title id="viewIem">View Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                xlinkTitle="View Item"
                                            ></use>
                                        </svg> View</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='cmnPagination'>
                    <Stack spacing={2}>
                        <Pagination count={10} variant="outlined" shape="rounded" />
                    </Stack>
                </div>
            </div>
            {/* Add Location Modals */}
            {addLocationModal && (
                <LocationModal
                    content={
                        <>
                            <div className="location-dialog">
                                <div className="location-dialog-head">
                                    <h3>Add Location</h3>
                                    <CloseIcon className="closeModal" color="action" onClick={(e) => { setAddLocationModal(false) }} />
                                </div>
                                <div className="location-dialog-body">
                                    <form onSubmit={addLocationSubmit}>
                                        <div className='form-group'>
                                            <label htmlFor="company_name">Company Name</label>
                                            <input type="text" name='company_name' id='company_name' className='form-control' placeholder='Company Name' onChange={locationHandleInput} value={createLocationData.company_name} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="house_number">House Number</label>
                                            <input type="text" name='house_number' id='house_number' className='form-control' placeholder='#House no' onChange={locationHandleInput} value={createLocationData.house_number} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="street">Street</label>
                                            <input type="text" name='street' id='street' className='form-control' placeholder='Street Name' onChange={locationHandleInput} value={createLocationData.street} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="postal_code">Postal Code</label>
                                            <input type="text" name='postal_code' id='postal_code' className='form-control' placeholder='Postal Code' onChange={locationHandleInput} value={createLocationData.postal_code} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="city">City</label>
                                            <input type="text" name='city' id='city' className='form-control' placeholder='City' onChange={locationHandleInput} value={createLocationData.city} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="location_image">Location Image</label>
                                            <input type="file" name='location_image' id='location_image' className='form-control' placeholder='Company Name' onChange={locationHandleInput} value={createLocationData.location_image} />
                                        </div>
                                        <MyMapComponent isMarkerShown />
                                        <div className='form-group'>
                                            <label htmlFor="location">Location</label>
                                            <input type="text" name='location' id='location' className='form-control' placeholder='Location' onChange={locationHandleInput} value={createLocationData.location} />
                                        </div>
                                        <div className="modal-btn-group">
                                            <button type="submit" className="btn cmn_yellow_bg">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                />
            )}
            {/* Edit Location Modals */}
            {editLocationModal && (
                <LocationModal
                    content={
                        <>
                            <div className="location-dialog">
                                <div className="location-dialog-head">
                                    <h3>Edit Location</h3>
                                    <CloseIcon className="closeModal" color="action" onClick={(e) => { setEditLocationModal(false) }} />
                                </div>
                                <div className="location-dialog-body">
                                    <form>
                                        <div className='form-group'>
                                            <label htmlFor="company_name">Company Name</label>
                                            <input type="text" name='company_name' id='company_name' className='form-control' placeholder='Company Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="house_number">House Number</label>
                                            <input type="text" name='house_number' id='house_number' className='form-control' placeholder='#House no' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="street">Street</label>
                                            <input type="text" name='street' id='street' className='form-control' placeholder='Street Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="postal_code">Postal Code</label>
                                            <input type="text" name='postal_code' id='postal_code' className='form-control' placeholder='Postal Code' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="city">City</label>
                                            <input type="text" name='city' id='city' className='form-control' placeholder='City' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="location_image">Location Image</label>
                                            <input type="file" name='location_image' id='location_image' className='form-control' placeholder='Company Name' />
                                        </div>
                                        <MyMapComponent isMarkerShown />
                                        <div className='form-group'>
                                            <label htmlFor="location">Location</label>
                                            <input type="text" name='location' id='location' className='form-control' placeholder='Location' />
                                        </div>
                                        <div className="modal-btn-group">
                                            <button type="submit" className="btn cmn_yellow_bg">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                />
            )}
            {/* View Location Modals */}
            {viewLocationModal && (
                <LocationModal
                    content={
                        <>
                            <div className="location-dialog">
                                <div className="location-dialog-head">
                                    <h3>View Location</h3>
                                    <CloseIcon className="closeModal" color="action" onClick={(e) => { setViewLocationModal(false) }} />
                                </div>
                                <div className="location-dialog-body view-location-modal">
                                    {locationData.map((curelem, index) => {
                                        const { company_name, house_number, street, postal_code, city, location_image, location } = curelem;
                                        return (
                                            <div key={index}>
                                                {
                                                    submitId === curelem._id &&
                                                    (
                                                        <ul>
                                                            {
                                                                company_name && (
                                                                    <li>
                                                                        <h6>Company Name</h6>
                                                                        <span>{company_name}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                house_number && (
                                                                    <li>
                                                                        <h6>House Number</h6>
                                                                        <span>{house_number}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                street && (
                                                                    <li>
                                                                        <h6>Street</h6>
                                                                        <span>{street}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                postal_code && (
                                                                    <li>
                                                                        <h6>Postal Code</h6>
                                                                        <span>{postal_code}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                city && (
                                                                    <li>
                                                                        <h6>City</h6>
                                                                        <span>{city}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                location_image && (
                                                                    <li>
                                                                        <h6>Location Image</h6>
                                                                        <span>{location_image}</span>
                                                                    </li>
                                                                )
                                                            }
                                                            {
                                                                location && (
                                                                    <li>
                                                                        <h6>Location</h6>
                                                                        <span>{location}</span>
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    )
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    }
                />
            )}
        </div>
    )
}

export default Locations