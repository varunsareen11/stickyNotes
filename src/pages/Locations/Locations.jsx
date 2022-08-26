import React, { useState, useEffect, useRef, useCallback } from "react";
import './style.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LocationModal from "../../modal/LocationModal/LocationModal";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../Redux/Action/Action";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const API = "http://54.87.14.216/api";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -3.745,
    lng: -38.523
};



function Locations() {

    // ============================================= Google Map integration ========================================================
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])



    // =====================================================================================================

    const locations = useSelector((state) => state.locationReducer.locations);
    const dispatch = useDispatch();
    const [addLocationModal, setAddLocationModal] = useState(false);
    const [viewLocationModal, setViewLocationModal] = useState(false);
    const [editLocationModal, setEditLocationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    const [updateLocationData, setUpdateLocationData] = useState({
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
    const locationFileHandle = (e) => {
        const file = e.target.files[0];
        setCreateLocationData({ ...createLocationData, "location_image": file });
    }
    // update handle
    const updateLocationHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdateLocationData({ ...updateLocationData, [name]: value });
    }
    const updateFileLocationHandle = (e) => {
        const file = e.target.files[0];
        setUpdateLocationData({ ...updateLocationData, "location_image": file });
    }
    const updateLocation = (e, id) => {
        e.preventDefault();
        updateLocationAPI(id, updateLocationData);
        setEditLocationModal(false);
    }
    const addLocationSubmit = (e) => {
        e.preventDefault();
        setCreateLocationData("");
        setAddLocation(createLocationData);
        createLocation(createLocationData);
        setAddLocationModal(false);
        getLocationData();
    }

    const locationSelect = (id, e) => {
        if (id) {
            if (e.target.checked === true) {
                setSubmitId(id);
            } else {
                setSubmitId("");
            }
        }
    }
    const deleteLocation = (e) => {
        if (submitId) {
            deleteSingleList(submitId);
            setSubmitId("")
        }
        else {
            console.log("Hello it is empty")
        }
    }
    // ============================================= Api Data ========================================================
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const token = getToken?.token;

    // Create Location 
    const createLocation = (data) => {
        console.log("createLocationData", data.city);
        var formdata = new FormData();
        formdata.append("company_name", data.company_name);
        formdata.append("house_number", data.house_number);
        formdata.append("street", data.street);
        formdata.append("postal_code", data.postal_code);
        formdata.append("city", data.city);
        formdata.append("location_image", data.location_image);
        formdata.append("location", data.location);
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
                getLocationData();
            })
            .catch((err) => {
                console.log("createLocation", err);
            });
    }

    // Update Api
    const updateLocationAPI = (apiId, data) => {
        var formdata = new FormData();
        formdata.append("company_name", data.company_name);
        formdata.append("house_number", data.house_number);
        formdata.append("street", data.street);
        formdata.append("postal_code", data.postal_code);
        formdata.append("city", data.city);
        formdata.append("location_image", data.location_image);
        formdata.append("location", data.location);
        return fetch(`${API}/update-location/${apiId}`, {
            method: "PUT",
            headers: {
                "x-access-token": token,
            },
            body: formdata,
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("json", json);
                getLocationData();
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
                dispatch(getLocation(reverseTaskList));
            })
            .catch((err) => {
                console.log("getLocationData", err);
            });
    };

    // Get Single Location Data
    const getSingleLocationData = (id, data) => {
        setIsLoading(true);
        return fetch(`${API}/get-location/${id}`, {
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
                setUpdateLocationData(json);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("getLocationData", err);
                setIsLoading(false);
            });
    };

    // Delete single location
    async function deleteSingleList(id) {
        let result = await fetch(`${API}/delete-location/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        getLocationData();
    }

    useEffect(() => {
        getLocationData();
    }, []);

    function search(items) {
        console.log(items)
        return items?.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(searchLocation.toLowerCase())
            )
        );
    }

    return (
        <div className="main-body">
            {/* heading */}
            <div className='heading_box'>
                <h2 className="dasshboard_heading">Standorte</h2>
                {/* <ul className='breadcrumb'>
                    <li>Dashboard</li>
                    <li className='active'>Locations</li>
                </ul> */}
            </div>
            {/* Location filterbar */}
            <div className='location-filter'>
                <div className="searchFilter">
                    <input
                        type="text"
                        placeholder="Standortsuche"
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
                    <button className='btn cmn_yellow_bg' onClick={(e) => { setAddLocationModal(true) }}> <svg className="icon" aria-labelledby="Add Item">
                        <title id="addItem">Add Item</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#addItem"
                            xlinkTitle="Add Item"
                        ></use>
                    </svg> Standort anlegen</button>
                    <button className='btn cmn_red_bg' onClick={(e) => { deleteLocation(e) }}> <svg className="icon" aria-labelledby="Remove Item" >
                        <title id="removeItem">Remove Item</title>
                        <use
                            xlinkHref="/assets/svg-icons/icons.svg#removeItem"
                            xlinkTitle="Remove Item"
                        ></use>
                    </svg> Standort löschen</button>
                </div>
            </div>

            {/* location Table */}
            <div className='locationTableWrap'>
                <ul className='locationTable'>
                    <li className='locationTableHeading'>
                        <div></div>
                        <div>Sno:</div>
                        <div>Location Name</div>
                        <div>Firma</div>
                        <div>Straße Nr</div>
                        <div>Ort</div>
                        <div>Actions</div>
                    </li>
                    {
                        search(locationData).map((curelem, index) => {
                            const { company_name, house_number, street, postal_code, city, location_image, location } = curelem;
                            return (
                                <li className='locationTableItem' key={index}>
                                    <div className="location-checkbox">
                                        <div className='ctm-checkbox'>
                                            <label className="ctm-checkbox-container" onClick={(e) => locationSelect(curelem?._id, e)}>Merken
                                                <input type="checkbox" />
                                                <span className="ctm-checkbox-checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='location-sr'>{index + 1}</div>
                                    <div className='locationName'>
                                        <img src={`http://54.87.14.216/${location_image}`} alt="Location Image" />
                                        {/* <div className='locationNameCont'>
                                            <h6>{company_name && company_name}</h6>
                                            <p>{house_number && house_number} {street && street}</p>
                                        </div> */}
                                    </div>
                                    <div>{company_name && company_name}</div>
                                    <div>{house_number && house_number} {street && street}</div>
                                    <div>{city && city}</div>
                                    <div className='btn-group'>
                                        <button className='btn cmn_yellow_bg' onClick={(e) => { getSingleLocationData(curelem._id); setSubmitId(curelem._id); setEditLocationModal(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                            <title id="editItem">Edit Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                xlinkTitle="Edit Item"
                                            ></use>
                                        </svg> ändern</button>
                                        <button className='btn cmn_red_bg' onClick={(e) => { getSingleLocationData(curelem._id); setSubmitId(curelem._id); setViewLocationModal(true) }}> <svg className="icon" aria-labelledby="View Item">
                                            <title id="viewIem">View Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                xlinkTitle="View Item"
                                            ></use>
                                        </svg> öffnen</button>
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
                                    <h3>Standort bearbeiten</h3>
                                    <CloseIcon className="closeModal" color="action" onClick={(e) => { setAddLocationModal(false) }} />
                                </div>
                                <div className="location-dialog-body">
                                    <form onSubmit={addLocationSubmit}>
                                        <div className='form-group'>
                                            <label htmlFor="company_name">Firma*</label>
                                            <input type="text" name='company_name' id='company_name' className='form-control' placeholder='Firma*' onChange={locationHandleInput} value={createLocationData.company_name} />
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
                                            <label htmlFor="postal_code">Postleitzahl*</label>
                                            <input type="text" name='postal_code' id='postal_code' className='form-control' placeholder='Postleitzahl*' onChange={locationHandleInput} value={createLocationData.postal_code} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="city">Ort</label>
                                            <input type="text" name='city' id='city' className='form-control' placeholder='Ort*' onChange={locationHandleInput} value={createLocationData.city} />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="location_image">Standortbild</label>
                                            <input type="file" name='location_image' id='location_image' className='form-control' placeholder='Company Name' onChange={locationFileHandle} accept="image/*" />
                                        </div>
                                        <div style={{ width: "100%", height: "300px" }}>
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={center}
                                                zoom={8}
                                                onLoad={onLoad}
                                                onUnmount={onUnmount}
                                            >
                                                { /* Child components, such as markers, info windows, etc. */}
                                                <></>
                                            </GoogleMap>
                                        </div>
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
                                    {
                                        isLoading === true && (
                                            <div className="modal-loading"></div>
                                        )
                                    }
                                    {
                                        updateLocationData &&
                                        (
                                            <form className={isLoading === true && "mdoal-opacity"}>
                                                <div className='form-group'>
                                                    <label htmlFor="company_name">Company Name</label>
                                                    <input type="text" name='company_name' id='company_name' className='form-control' placeholder='Company Name' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.company_name} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="house_number">House Number</label>
                                                    <input type="text" name='house_number' id='house_number' className='form-control' placeholder='#House no' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.house_number} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="street">Street</label>
                                                    <input type="text" name='street' id='street' className='form-control' placeholder='Street Name' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.street} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="postal_code">Postal Code</label>
                                                    <input type="text" name='postal_code' id='postal_code' className='form-control' placeholder='Postal Code' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.postal_code} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" name='city' id='city' className='form-control' placeholder='City' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.city} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="location_image">Location Image</label>
                                                    <input type="file" name='location_image' id='location_image' className='form-control' placeholder='Company Name' onChange={(e) => { updateFileLocationHandle(e) }} />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="location">Location</label>
                                                    <input type="text" name='location' id='location' className='form-control' placeholder='Location' onChange={(e) => { updateLocationHandle(e) }} value={updateLocationData.location} />
                                                </div>
                                                <div className="modal-btn-group">
                                                    <button type="submit" onClick={(e) => { updateLocation(e, updateLocationData._id) }} className="btn cmn_yellow_bg">Update</button>
                                                </div>
                                            </form>
                                        )
                                    }
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
                                    {updateLocationData && (
                                        <>
                                            <ul className={isLoading === true && "mdoal-opacity"}>
                                                {
                                                    updateLocationData.company_name && (
                                                        <li>
                                                            <h6>Company Name</h6>
                                                            <span>{updateLocationData.company_name}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.house_number && (
                                                        <li>
                                                            <h6>House Number</h6>
                                                            <span>{updateLocationData.house_number}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.street && (
                                                        <li>
                                                            <h6>Street</h6>
                                                            <span>{updateLocationData.street}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.postal_code && (
                                                        <li>
                                                            <h6>Postal Code</h6>
                                                            <span>{updateLocationData.postal_code}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.city && (
                                                        <li>
                                                            <h6>City</h6>
                                                            <span>{updateLocationData.city}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.location_image && (
                                                        <li>
                                                            <h6>Location Image</h6>
                                                            <span>{updateLocationData.location_image}</span>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    updateLocationData.location && (
                                                        <li>
                                                            <h6>Location</h6>
                                                            <span>{updateLocationData.location}</span>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </>
                                    )
                                    }
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