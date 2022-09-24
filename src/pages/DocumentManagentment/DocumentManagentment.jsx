
import react, { useEffect, useState } from 'react';
import './style.css';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch, useSelector } from "react-redux";
import DocumentModal from '../../modal/DocumentModal/DocumentModal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const API = "http://54.87.14.216/api";

const DocumentManagentment = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [getDocument, SetGetDocument] = useState({});
    const [searchTerm] = useState(["file_name"]);
    const selectedLocationId = useSelector((state) => state.locationIdReducer);
    const getCurrentDate = (separator = '/') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    const [editSingleDocument, setEditSingleDocument] = useState({
        file_name: "",
        category: "",
        location: selectedLocationId,
        date: getCurrentDate(),
        upload_document: "",
        calendar_reminder_interval: "",
        calendar_reminder_choose_date: "",
        note_item: "",
        note_create_task: ""
    });
    function search(items) {
        return items?.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(props.locSearch.toLowerCase())
            )
        );
    }
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const token = getToken?.token;


    useEffect(() => {
        getDocumentAPI();
        singleDocumentAPI();
        categoryListAPI();
    }, [selectedLocationId])

    // getDocumnet API
    const getDocumentAPI = (data) => {
        return fetch(`${API}/get-document-data/${selectedLocationId}`, {
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
                SetGetDocument(json);
            })
            .catch((err) => {
                console.log("getDocumentAPI", err);
            });
    };
    // get Single Documnet
    const singleDocumentAPI = (id, data) => {
        return fetch(`${API}/get-document/${id}`, {
            method: "GET",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                getDocumentAPI();
                setEditSingleDocument(json)
            })
    }
    // Update Single Category
    const singleUpdateDocumentAPI = (id, data) => {
        var formdata = new FormData();
        formdata.append("file_name", data.file_name);
        formdata.append("category", data.category);
        formdata.append("location", data.location);
        formdata.append("date", data.date);
        formdata.append("upload_document", data.upload_document);
        {
            data?.calendar_reminder_interval ?
                formdata.append("calendar_reminder_interval", data.calendar_reminder_interval) :
                formdata.append("calendar_reminder_interval", "")
        }
        {
            data?.calendar_reminder_choose_date ?
                formdata.append("calendar_reminder_choose_date", data.calendar_reminder_choose_date) :
                formdata.append("calendar_reminder_choose_date", "")
        }
        {
            data?.note_item ?
                formdata.append("note_item", data.note_item) :
                formdata.append("note_item", "")
        }
        {
            data?.note_create_task ?
                formdata.append("note_create_task", data.note_create_task) :
                formdata.append("note_create_task", "")
        }
        return fetch(`${API}/update-document/${id}`, {
            method: "PUT",
            headers: {
                "x-access-token": token,
            },
            body: formdata,
        }).then((res) => (res.json()))
            .then((json) => {
                getDocumentAPI();
                singleDocumentAPI();
                getSidebar();
            })
    }
    // Delete Document 
    async function deleteDocument(id) {
        let result = await fetch(`${API}/delete-document/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        getDocumentAPI();
    }


    // Upload document Data
    const [checkNote, setCheckNote] = useState(false);
    const [calenderReminder, setCalenderReminder] = useState(false);
    const [location, setLocation] = useState({});
    const [category, setCategory] = useState({});
    const [value, setValue] = useState(null);

    const [uploadDoc, setUploadDoc] = useState({
        file_name: "",
        category: "",
        location: selectedLocationId,
        date: getCurrentDate(),
        upload_document: "",
        calendar_reminder_interval: "",
        calendar_reminder_choose_date: "",
        note_item: "",
        note_create_task: ""
    })
    const handleUploadChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUploadDoc({ ...uploadDoc, [name]: value });
        categoryListAPI();
    }
    const handleUploadFileChange = (e) => {
        const file = e.target.files[0];
        setUploadDoc({ ...uploadDoc, "upload_document": file });
    }
    const handleNoteChange = (e) => {
        if (e.target.checked) {
            setCheckNote(true);
        } else {
            setCheckNote(false);
        }
    }
    const handleCalenderChange = (e) => {
        if (e.target.checked) {
            setCalenderReminder(true);
        } else {
            setCalenderReminder(false);
        }
    }
    const handleTaskChange = (e) => {
        setUploadDoc({ ...uploadDoc, "note_create_task": e.target.checked });
    }
    const handleUploadSubmit = (e) => {
        e.preventDefault();
        createDocument(uploadDoc);
        if (uploadDoc.note_item && uploadDoc.note_create_task == true) {
            createSlidebar({ title: uploadDoc.note_item, location: selectedLocationId })
        }
        setUploadDoc("");
        props.setAddDoc(false);
    }

    // Edit Category Points
    const handleEditUploadChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditSingleDocument({ ...editSingleDocument, [name]: value });
    }
    const handleEditUploadFileChange = (e) => {
        const file = e.target.files[0];
        setEditSingleDocument({ ...editSingleDocument, "upload_document": file });
    }
    const handleEditNoteChange = (e) => {
        if (e.target.checked) {
            setCheckNote(true);
        } else {
            setCheckNote(false);
        }
    }
    const handleEditCalenderChange = (e) => {
        if (e.target.checked) {
            setCalenderReminder(true);
        } else {
            setCalenderReminder(false);
        }
    }
    const handleEditTaskChange = (e) => {
        setEditSingleDocument({ ...editSingleDocument, "note_create_task": e.target.checked });
    }
    const handleEditUploadSubmit = (e, id) => {
        e.preventDefault();
        props.setEditCat(false);
        singleUpdateDocumentAPI(id, editSingleDocument)
    }

    // APIS

    // get Category
    const categoryListAPI = (data) => {
        return fetch(`${API}/get-category`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                setCategory(json);
            })
    }

    // Create Document API
    const createDocument = (data) => {
        var formdata = new FormData();
        formdata.append("file_name", data.file_name);
        formdata.append("category", data.category);
        formdata.append("location", data.location);
        formdata.append("date", data.date);
        formdata.append("upload_document", data.upload_document);
        {
            data?.calendar_reminder_interval ?
                formdata.append("calendar_reminder_interval", data.calendar_reminder_interval) :
                formdata.append("calendar_reminder_interval", "")
        }
        {
            data?.calendar_reminder_choose_date ?
                formdata.append("calendar_reminder_choose_date", data.calendar_reminder_choose_date) :
                formdata.append("calendar_reminder_choose_date", "")
        }
        {
            data?.note_item ?
                formdata.append("note_item", data.note_item) :
                formdata.append("note_item", "")
        }
        {
            data?.note_create_task ?
                formdata.append("note_create_task", data.note_create_task) :
                formdata.append("note_create_task", "")
        }
        return fetch(`${API}/create-document`, {
            method: "POST",
            headers: {
                "x-access-token": token,
            },
            body: formdata,
        })
            .then((res) => res.json())
            .then((json) => {
                // console.log("create-document", json);
                getDocumentAPI();
                getSidebar();
            })
            .catch((err) => {
                console.log("create-document", err);
            });
    }

    // create task
    const createSlidebar = (data) => {
        return fetch(`${API}/create-sidebar`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                // console.log("json", json);
                getSidebar();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //   get Slidebar
    const getSidebar = (data) => {
        return fetch(`${API}/get-sidebar/${selectedLocationId}`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                let reverseTaskList = json?.reverse();
                // setItems(reverseTaskList);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className='doc-management-wrap'>
                {
                    !props.addDoc ? (
                        <>
                            <div class="getDocumentDataTable">
                                <ul>
                                    <li className='documentTableHeading'>
                                        <div>Dokument </div>
                                        <div>Kategorie</div>
                                        <div>Datum </div>
                                        <div>Erinnerung</div>
                                        <div>Aufgabe </div>
                                    </li>
                                    {
                                        getDocument.length > 0 && search(getDocument).map((curElem, index) => {
                                            return (
                                                <div key={index}>
                                                    {
                                                        curElem.category ? (
                                                            <>
                                                                {
                                                                    category.length > 0 && category?.map((cateCurelem, cateIndex) => {
                                                                        return (
                                                                            <>
                                                                                {
                                                                                    curElem.category == cateCurelem._id && (
                                                                                        <li className='documentTableItem'
                                                                                            style={{ background: cateCurelem.color }}
                                                                                        >
                                                                                            <div className=''>
                                                                                                {curElem.file_name}
                                                                                            </div>
                                                                                            <div className=''>
                                                                                                {cateCurelem.title}
                                                                                            </div>
                                                                                            <div>{curElem.date}</div>
                                                                                            <div>{curElem.calendar_reminder_interval ? curElem.calendar_reminder_interval : "-"}</div>
                                                                                            <div className='btn-group'>
                                                                                                <button className='btn cmn_yellow_bg' onClick={(e) => { categoryListAPI(); singleDocumentAPI(curElem._id); props.setEditCat(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                                                                                    <title id="editItem">Edit Item</title>
                                                                                                    <use
                                                                                                        xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                                                                        xlinkTitle="Edit Item"
                                                                                                    ></use>
                                                                                                </svg> ändern</button>
                                                                                                <button className='btn cmn_red_bg' onClick={(e) => { deleteDocument(curElem._id) }}> <svg className="icon" aria-labelledby="View Item">
                                                                                                    <title id="viewIem">Delete Item</title>
                                                                                                    <use
                                                                                                        xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                                                                        xlinkTitle="View Item"
                                                                                                    ></use>
                                                                                                </svg> Delete</button>
                                                                                            </div>
                                                                                        </li>)
                                                                                }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        ) : (
                                                            <li className='documentTableItem' style={{ background: "#fff" }}>
                                                                <div className=''>
                                                                    {curElem.file_name}
                                                                </div>
                                                                <div className=''>
                                                                    _
                                                                </div>
                                                                <div>{curElem.date}</div>
                                                                <div>{curElem.calendar_reminder_interval ? curElem.calendar_reminder_interval : "-"}</div>
                                                                <div className='btn-group'>
                                                                    <button className='btn cmn_yellow_bg' onClick={(e) => { singleDocumentAPI(curElem._id); props.setEditCat(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                                                        <title id="editItem">Edit Item</title>
                                                                        <use
                                                                            xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                                            xlinkTitle="Edit Item"
                                                                        ></use>
                                                                    </svg> ändern</button>
                                                                    <button className='btn cmn_red_bg' onClick={(e) => { deleteDocument(curElem._id) }}> <svg className="icon" aria-labelledby="View Item">
                                                                        <title id="viewIem">Delete Item</title>
                                                                        <use
                                                                            xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                                            xlinkTitle="View Item"
                                                                        ></use>
                                                                    </svg> Delete</button>
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                                </div>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </>
                    ) :
                        (
                            <DocumentModal
                                content={
                                    <div className='cmn_modal'>
                                        <CloseIcon className="closeModal" color="action" onClick={(e) => { props.setAddDoc(false) }} />
                                        <div className='doc-management-wrap-cate'>
                                            <div className='doc-management-wrap-head'>
                                                <h2 className="dasshboard_heading">Upload New Document</h2>
                                                <div className='btn-group'>
                                                    <button className='btn cmn_yellow_bg'
                                                        onClick={(e) => (handleUploadSubmit(e))}
                                                    >
                                                        <svg className="icon" aria-labelledby="Add Item">
                                                            <title id="addItem">Add Item</title>
                                                            <use
                                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                                xlinkTitle="Add Item"
                                                            ></use>
                                                        </svg>
                                                        Speichern
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='upload-document-form'>
                                                <form>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label htmlFor="document_name">Document Name</label>
                                                                <input type="text" name='document_name' id='document_name' className='form-control' placeholder='Document name here' value={uploadDoc.upload_document.name} readonly />
                                                            </div>
                                                            <div className='form-group'>
                                                                <label htmlFor="file_name">File Name</label>
                                                                <input type="text" name='file_name' id='file_name' className='form-control' placeholder='File name here' onChange={(e) => { handleUploadChange(e) }} value={uploadDoc.file_name} />
                                                            </div>
                                                            <div className='form-group'>
                                                                <label htmlFor="category">Select Category</label>
                                                                <select name="category" id="category" className='form-control' onChange={(e) => { categoryListAPI(); handleUploadChange(e) }} value={uploadDoc.category}>
                                                                    <option value="">Please Select Category</option>
                                                                    {
                                                                        category.length > 0 && category?.map((curelem, index) => {
                                                                            return (
                                                                                <option key={index} value={curelem?._id}>{curelem?.title}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className='form-group'>
                                                                <label htmlFor="date">Date</label>
                                                                <input type="text" className="form-control" name="date" id="date" onChange={(e) => { handleUploadChange(e) }} value={getCurrentDate()} readOnly />
                                                            </div>
                                                            <div className='form-group'>
                                                                <label className="custom_switch" onClick={(e) => { handleCalenderChange(e) }}>
                                                                    <input type="checkbox" name="calenderReminder" id='calenderReminder' />
                                                                    <span className="slider round"></span>
                                                                </label>
                                                                <label htmlFor="calenderReminder"> Calender Reminder</label>
                                                            </div>
                                                            {
                                                                calenderReminder && (
                                                                    <div className="row calenderSwitch">
                                                                        <div className="col">
                                                                            <div className='form-group'>
                                                                                <label htmlFor="calendar_reminder_interval">Interval</label>
                                                                                <select name="calendar_reminder_interval" id="calendar_reminder_interval" className='form-control' onChange={(e) => { handleUploadChange(e) }} value={uploadDoc.calendar_reminder_interval}>
                                                                                    <option value="">Please Select Interval</option>
                                                                                    <option value="Monatlich">Monatlich</option>
                                                                                    <option value="Quartalsweise">Quartalsweise</option>
                                                                                    <option value="Halbjährig">Halbjährig</option>
                                                                                    <option value="Einjährig">Einjährig</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className='form-group'>
                                                                                <label htmlFor="calendar_reminder_choose_date">Choose Date</label>
                                                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                                    <DatePicker classNae
                                                                                        name="calendar_reminder_choose_date"
                                                                                        id="date"
                                                                                        className="form-control"
                                                                                        value={value}
                                                                                        onChange={(newValue) => {
                                                                                            setValue(newValue);
                                                                                        }}
                                                                                        renderInput={(params) => <TextField {...params} />}
                                                                                    />
                                                                                </LocalizationProvider>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            <div className='form-group'>
                                                                <label className="custom_switch" onClick={(e) => { handleNoteChange(e) }}>
                                                                    <input type="checkbox" name="createNote" id='createNote' />
                                                                    <span className="slider round"></span>
                                                                </label>
                                                                <label htmlFor="createNote"> Create Note</label>
                                                            </div>
                                                            {
                                                                checkNote && (
                                                                    <div className='createNoteSwitch'>
                                                                        <div className='form-group'>
                                                                            <label htmlFor="note_item">Write Note</label>
                                                                            <textarea name="note_item" id="note_item" className="form-control" cols="10" rows="3" onChange={(e) => { handleUploadChange(e) }} value={uploadDoc.note_item}></textarea>
                                                                        </div>
                                                                        <div className='ctm-checkbox'>
                                                                            <label className="ctm-checkbox-container" htmlFor="note_create_task" onChange={(e) => { handleTaskChange(e) }}>
                                                                                <input type="checkbox" name="note_create_task" id="note_create_task" />
                                                                                <span className="ctm-checkbox-checkmark"></span>
                                                                                Create Task
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className='uploadFileArea'>
                                                                <div className="form-group file-area">
                                                                    <input type="file" name="upload_document" id="upload_document" onChange={(e) => { handleUploadFileChange(e) }} accept=".pdf,.doc" />
                                                                    <div class="file-dummy" >
                                                                        <div className="indiebloc">
                                                                            {uploadDoc?.upload_document ? uploadDoc.upload_document.name : (
                                                                                <>
                                                                                    <svg className="icon" aria-labelledby="Drag Drop Icon">
                                                                                        <title id="dragDrop">Drag Drop Icon</title>
                                                                                        <use
                                                                                            xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                                                                            xlinkTitle="Drag Drop Icon"
                                                                                        ></use>
                                                                                    </svg>
                                                                                    <p>Drag & Drop to Upload File</p>
                                                                                    <button className='btn cmn_red_bg'>Browse File</button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <div className='upload-file-icons'>
                                                                            <img src="/assets/images/icon01.png" alt="Icon 01" />
                                                                            <img src="/assets/images/icon02.png" alt="Icon 02" />
                                                                            <img src="/assets/images/icon03.png" alt="Icon 03" />
                                                                            <img src="/assets/images/icon04.png" alt="Icon 04" />
                                                                            <img src="/assets/images/icon05.png" alt="Icon 05" />
                                                                            <img src="/assets/images/icon06.png" alt="Icon 06" />
                                                                            <img src="/assets/images/icon07.png" alt="Icon 07" />
                                                                        </div>
                                                                        <button className='btn cmn_yellow_bg'>
                                                                            <svg className="icon" aria-labelledby="Drag Drop Icon">
                                                                                <title id="dragDrop">Drag Drop Icon</title>
                                                                                <use
                                                                                    xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                                                                    xlinkTitle="Drag Drop Icon"
                                                                                ></use>
                                                                            </svg>
                                                                            Upload Document
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />)
                }

                {
                    props.editcat && (
                        <DocumentModal
                            content={
                                <div className='cmn_modal'>
                                    <CloseIcon className="closeModal" color="action" onClick={(e) => { props.setEditCat(false) }} />
                                    <div className='doc-management-wrap-cate'>
                                        <div className='doc-management-wrap-head'>
                                            <h2 className="dasshboard_heading">Edit Document</h2>
                                            <div className='btn-group'>
                                                <button className='btn cmn_yellow_bg'
                                                    onClick={(e) => (handleEditUploadSubmit(e, editSingleDocument._id))}
                                                >
                                                    <svg className="icon" aria-labelledby="Add Item">
                                                        <title id="addItem">Add Item</title>
                                                        <use
                                                            xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                            xlinkTitle="Add Item"
                                                        ></use>
                                                    </svg>
                                                    Save on Computer
                                                </button>
                                            </div>
                                        </div>
                                        <div className='upload-document-form'>
                                            <form>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label htmlFor="document_name">Document Name</label>
                                                            <input type="text" name='document_name' id='document_name' className='form-control' placeholder='Document name here' value={editSingleDocument?.upload_document?.name ? editSingleDocument.upload_document.name : editSingleDocument.upload_document} readOnly />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor="file_name">File Name</label>
                                                            <input type="text" name='file_name' id='file_name' className='form-control' placeholder='Document name here' onChange={(e) => { handleEditUploadChange(e) }} value={editSingleDocument.file_name} />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor="category">Select Category</label>
                                                            <select name="category" id="category" className='form-control' onChange={(e) => { handleEditUploadChange(e) }} value={editSingleDocument.category}>
                                                                <option value="">Please Select Category</option>
                                                                {
                                                                    category.length > 0 && category?.map((curelem, index) => {
                                                                        return (
                                                                            <option key={index} value={curelem?._id}>{curelem?.title}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='form-group'>
                                                            <label htmlFor="date">Date</label>
                                                            <input type="text" className="form-control" name="date" id="date" value={editSingleDocument.date} readOnly />
                                                        </div>
                                                        <div className='form-group'>
                                                            <label className="custom_switch" onClick={(e) => { handleEditCalenderChange(e) }}>
                                                                <input type="checkbox" name="calenderReminder" id='calenderReminder' />
                                                                <span className="slider round"></span>
                                                            </label>
                                                            <label htmlFor="calenderReminder"> Calender Reminder</label>
                                                        </div>
                                                        {
                                                            calenderReminder && (
                                                                <div className="row calenderSwitch">
                                                                    <div className="col">
                                                                        <div className='form-group'>
                                                                            <label htmlFor="calendar_reminder_interval">Interval</label>
                                                                            <select name="calendar_reminder_interval" id="calendar_reminder_interval" className='form-control' onChange={(e) => { handleEditUploadChange(e) }} value={editSingleDocument.calendar_reminder_interval}>
                                                                                <option value="">Please Select Interval</option>
                                                                                <option value="Monatlich">Monatlich</option>
                                                                                <option value="Quartalsweise">Quartalsweise</option>
                                                                                <option value="Halbjährig">Halbjährig</option>
                                                                                <option value="Einjährig">Einjährig</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className='form-group'>
                                                                            <label htmlFor="calendar_reminder_choose_date">Choose Date</label>
                                                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                                <DatePicker classNae
                                                                                    name="calendar_reminder_choose_date"
                                                                                    id="date"
                                                                                    className="form-control"
                                                                                    value={value}
                                                                                    onChange={(newValue) => {
                                                                                        setValue(newValue);
                                                                                    }}
                                                                                    renderInput={(params) => <TextField {...params} />}
                                                                                />
                                                                            </LocalizationProvider>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        <div className='form-group'>
                                                            <label className="custom_switch" onClick={(e) => { handleEditNoteChange(e) }}>
                                                                <input type="checkbox" name="createNote" id='createNote' />
                                                                <span className="slider round"></span>
                                                            </label>
                                                            <label htmlFor="createNote"> Create Note</label>
                                                        </div>
                                                        {
                                                            checkNote && (
                                                                <div className='createNoteSwitch'>
                                                                    <div className='form-group'>
                                                                        <label htmlFor="note_item">Write Note</label>
                                                                        <textarea name="note_item" id="note_item" className="form-control" cols="10" rows="3" onChange={(e) => { handleEditUploadChange(e) }} value={editSingleDocument.note_item}></textarea>
                                                                    </div>
                                                                    <div className='ctm-checkbox'>
                                                                        <label className="ctm-checkbox-container" htmlFor="note_create_task" onChange={(e) => { handleEditTaskChange(e) }}>
                                                                            <input type="checkbox" name="note_create_task" id="note_create_task" />
                                                                            <span className="ctm-checkbox-checkmark"></span>
                                                                            Create Task
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='uploadFileArea'>
                                                            <div className="form-group file-area">
                                                                <input type="file" name="upload_document" id="upload_document" onChange={(e) => { handleEditUploadFileChange(e) }} accept=".pdf,.doc" />
                                                                <div class="file-dummy">
                                                                    <div className="indiebloc">
                                                                        {editSingleDocument?.upload_document?.name ? editSingleDocument.upload_document.name : (
                                                                            editSingleDocument.upload_document
                                                                        )}
                                                                    </div>
                                                                    <div className='upload-file-icons'>
                                                                        <img src="/assets/images/icon01.png" alt="Icon 01" />
                                                                        <img src="/assets/images/icon02.png" alt="Icon 02" />
                                                                        <img src="/assets/images/icon03.png" alt="Icon 03" />
                                                                        <img src="/assets/images/icon04.png" alt="Icon 04" />
                                                                        <img src="/assets/images/icon05.png" alt="Icon 05" />
                                                                        <img src="/assets/images/icon06.png" alt="Icon 06" />
                                                                        <img src="/assets/images/icon07.png" alt="Icon 07" />
                                                                    </div>
                                                                    <button className='btn cmn_yellow_bg'>
                                                                        <svg className="icon" aria-labelledby="Drag Drop Icon">
                                                                            <title id="dragDrop">Drag Drop Icon</title>
                                                                            <use
                                                                                xlinkHref="/assets/svg-icons/icons.svg#dragDrop"
                                                                                xlinkTitle="Drag Drop Icon"
                                                                            ></use>
                                                                        </svg>
                                                                        Upload Document
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    )
                }

            </div>
        </>
    )
};

export default DocumentManagentment;