import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../Redux/Action/Action";
import './style.css';
const API = "http://54.87.14.216/api";

const AddCategory = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [editCategoryBox, setEditCategoryBox] = useState(false);
    const category = useSelector((state) => state.categoryReducer.category);
    const dispatch = useDispatch();
    const [getCategoryList, setGetCategoryList] = useState(false);
    const getToken = JSON.parse(localStorage.getItem("user-info"));
    const token = getToken?.token;
    const [categoryForm, setCategoryform] = useState({
        title: "",
        color: ""
    });
    const [singleCategory, setSingleCategory] = useState({});
    const [editCategory, setEditSingleCategory] = useState({
        title: "",
        color: ""
    });
    const handleCategoryChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCategoryform({ ...categoryForm, [name]: value });
    }
    const handleUpdateCategoryChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditSingleCategory({ ...editCategory, [name]: value });
    }
    const handleSubmitCategory = (e) => {
        e.preventDefault();
        setAddCategory(false);
        createSlidebar(categoryForm)
        setCategoryform('')
    }
    const handleUpateSubmitCategory = (e, id) => {
        e.preventDefault();
        setEditCategoryBox(false);
        singleUpdateCategoryAPI(id, editCategory)
    }
    useEffect(() => {
        categoryListAPI();
        singleCategoryAPI();
    }, [])

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
                dispatch(getCategory(json));
            })
    }
    // create Category 
    const createSlidebar = (data) => {
        return fetch(`${API}/create-category`, {
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
                categoryListAPI();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Delete Category 
    async function deleteCategory(id) {
        let result = await fetch(`${API}/delete-category/${id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        categoryListAPI();
    }

    // get Single Category
    const singleCategoryAPI = (id, data) => {
        return fetch(`${API}/get-category/${id}`, {
            method: "POST",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                categoryListAPI();
                setSingleCategory(json)
                setEditSingleCategory(json[0])
            })
    }
    // Update Single Category
    const singleUpdateCategoryAPI = (id, data) => {
        return fetch(`${API}/update-category/${id}`, {
            method: "PUT",
            headers: {
                "x-access-token": token,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => (res.json()))
            .then((json) => {
                categoryListAPI();
                setSingleCategory()
            })
    }

    return (
        <div className='doc-management-wrap-cate'>
            <div className='doc-management-wrap-head'>
                {!addCategory ? (
                    <>
                        {
                            !editCategoryBox ? (<h2 className="dasshboard_heading">Categories</h2>) :
                                (<h2 className="dasshboard_heading">Edit Category</h2>)
                        }
                    </>
                ) : (<h2 className="dasshboard_heading">Add Categories</h2>)}
                <div className='btn-group'>
                    {!addCategory ? (
                        <>
                            {
                                !editCategoryBox ? (
                                    <button className='btn cmn_yellow_bg'
                                        onClick={(e) => (setAddCategory(true))}
                                    >
                                        <svg className="icon" aria-labelledby="Add Item">
                                            <title id="addItem">Add Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                xlinkTitle="Add Item"
                                            ></use>
                                        </svg>
                                        Add Category
                                    </button>
                                ) : (
                                    <button className='btn cmn_yellow_bg'
                                        onClick={(e) => (handleUpateSubmitCategory(e, editCategory?._id))}
                                    >
                                        <svg className="icon" aria-labelledby="Add Item">
                                            <title id="addItem">Add Item</title>
                                            <use
                                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                                xlinkTitle="Add Item"
                                            ></use>
                                        </svg>
                                        Save Category
                                    </button>
                                )
                            }
                        </>
                    ) : <button className='btn cmn_yellow_bg'
                        onClick={(e) => (handleSubmitCategory(e))}
                    >
                        <svg className="icon" aria-labelledby="Add Item">
                            <title id="addItem">Add Item</title>
                            <use
                                xlinkHref="/assets/svg-icons/icons.svg#addItem"
                                xlinkTitle="Add Item"
                            ></use>
                        </svg>
                        Save Category
                    </button>
                    }
                </div>
            </div>
            {!addCategory ? (
                <>
                    {
                        !editCategoryBox && (
                            <ul className='management-cate-list'>
                                {
                                    category.map((curelem, index) => {
                                        return (
                                            <li key={index}>
                                                <span className='list-item'>{curelem.title}</span>
                                                <div className='btn-group'>
                                                    <div className='coloPricker' style={{ background: curelem.color }}></div>
                                                    <button className='btn cmn_yellow_bg' onClick={(e) => { setAddCategory(false); singleCategoryAPI(curelem._id); setEditCategoryBox(true) }}> <svg className="icon" aria-labelledby="Edit Item">
                                                        <title id="editItem">Edit Item</title>
                                                        <use
                                                            xlinkHref="/assets/svg-icons/icons.svg#editItem"
                                                            xlinkTitle="Edit Item"
                                                        ></use>
                                                    </svg> Edit</button>
                                                    <button className='btn cmn_red_bg' onClick={(e) => { deleteCategory(curelem._id) }}> <svg className="icon" aria-labelledby="View Item">
                                                        <title id="viewIem">View Item</title>
                                                        <use
                                                            xlinkHref="/assets/svg-icons/icons.svg#viewItem"
                                                            xlinkTitle="View Item"
                                                        ></use>
                                                    </svg> Delete</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                </>
            ) : (
                <div className='categoryForm'>
                    <div className='form-group'>
                        <label htmlFor="title">Category Name</label>
                        <input type="text" name='title' id='title' className='form-control' placeholder='Category name' onChange={(e) => handleCategoryChange(e)} value={categoryForm.category_name} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="color">Color</label>
                        <input type="text" name='color' id='color' className='form-control' placeholder='Pick Color' onChange={(e) => handleCategoryChange(e)} value={categoryForm.color_code} />
                    </div>
                </div>
            )
            }
            {
                editCategoryBox && (
                    <>
                        <div className='categoryForm'>
                            <div className='form-group'>
                                <label htmlFor="title">Category Name</label>
                                <input type="text" name='title' id='title' className='form-control' placeholder='Category name' onChange={(e) => handleUpdateCategoryChange(e)} value={editCategory?.title} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="color">Color</label>
                                <input type="text" name='color' id='color' className='form-control' placeholder='Pick Color' onChange={(e) => handleUpdateCategoryChange(e)} value={editCategory?.color} />
                            </div>
                        </div>
                    </>

                )
            }
        </div >
    )
};

export default AddCategory;