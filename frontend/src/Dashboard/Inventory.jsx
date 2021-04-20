import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import StoreDashboard from '../Layout/StoreDashboard';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Tags from '../Components/Tags';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { apiUrl } from '../API/apiUrl';
import { Avatar } from '@material-ui/core';
import ProductsTable from '../Components/ProductsTable';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Inventory() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('zomtoken')
    const user = localStorage.getItem('zomuser')

    const [productname, setProductName] = useState('')
    const [newcategory, setNewCategory] = useState({})//to store selecte category
    const [newsubcategory, setNewSubCategory] = useState()// to store subcategories from api
    const [picture, setPicture] = useState(null)
    const [price, setPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [description, setDescripiton] = useState('')
    const [catTags, setCatTags] = useState()
    const [sent, setSent] = useState(false)


    const [previewSrc, setPreviewSrc] = useState('')
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)
    const dropRef = useRef();

    const [apiSubCats, setApiSubCats] = useState()// to store categories from api as id
    const [apiCats, setApiCats] = useState() //to store selected subcategory

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setPicture(uploadedFile);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    };
    const selectedTags = (tags) => {
        // console.log(tags)
        setCatTags(tags)
    }

    const getCategories = () => {
        // GET request using fetch inside useEffect React hook
        fetch(`${apiUrl}/category/all`)
            .then(response => response.json())
            .then(data => setApiCats(data.categories));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    const getSubCategories = () => {
        // GET request using fetch inside useEffect React hook
        fetch(`${apiUrl}/subcategory/subcategories/${newcategory}`)
            .then(response => response.json())
            .then(data => setApiSubCats(data.subcategories))
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }

    //function to create a product
    const createProduct = (e) => {
        console.log(productname)
        console.log(newcategory)
        console.log(newsubcategory)
        console.log(picture)
        console.log(price)
        console.log(discountPrice)
        console.log(description)
        console.log(catTags)

        e.preventDefault()
        let formData = new FormData();
        formData.append('name', productname);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discountPrice', discountPrice);
        formData.append('subcategory', newsubcategory);
        formData.append('categoryid', newcategory);
        formData.append('productpicture', picture);
        formData.append('tags', catTags);

        fetch(`${apiUrl}/products/create`,
            {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    "Authorization": token
                },
                body: formData
            }).then(response => {
                console.log(response.status);
                setSent('sent')
                setTimeout(() => {
                    setOpen(false)
                }, 2000);
                console.log(response)
            }).then(data => console.log(data));
    }



    useEffect(() => {
        getCategories()
        getSubCategories()
    }, [newcategory]);

    // console.log(newsubcategory)

    return (
        <StoreDashboard>
            <div className="zvi grid grid-cols-4 gap-8 bg-gray-50 dark:bg-gray-900">

                {/* inventory left */}

                <div className="left col-span-1 shadow rounded max-h-screen  p-4 bg-white dark:bg-gray-800">
                    <p className="text-gray-700 text-xl font-semibold dark:text-white text-center mb-4">Customize Store Page        </p>
                    <div className="flex flex-col">
                        <img src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} alt="user" className="w-36 h-36 rounded-full self-center" />
                        {/* <p className="text-blue-900 font-semibold self-center">{JSON.parse(user).username}</p> */}
                        
                        <div className="flex flex-row text-gray-500 dark:text-gray-300 items-center hover:text-gray-700 cursor-pointer justify-between">
                            <p className="text-sm">Logo</p>
                            <AddAPhotoIcon/>
                        </div>
                        <div className="border-b w-full self-center border-gray-300 dark:border-gray-600 m-4"></div>
                    </div>
                    <div className="flex flex-col">
                        <img src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} alt="user" className="w-36 self-center" />
                        {/* <p className="text-blue-900 font-semibold self-center">{JSON.parse(user).username}</p> */}
                        
                        <div className="flex flex-row text-gray-500 dark:text-gray-300 hover:text-gray-700 cursor-pointer items-center justify-between">
                            <p className="text-sm">Banner</p>
                            <AddAPhotoIcon/>
                        </div>
                        <div className="border-b w-full self-center border-gray-300 dark:border-gray-600 m-4"></div>
                    </div>
                    
               </div>

               {/* inventory right` */}
                <div className="right col-span-3">
                    <div className="serv md:px-8 px-2 py-8 flex flex-col">
                        <div className="top mb-8 flex flex-row items-center justify-between">
                            <p className="text-3xl text-gray-700 dark:text-white font-semibold">Your inventory</p>
                            <span onClick={handleOpen} className="text-white bg-green-500 p-2 hover:bg-green-400 hover:text-gray-700 text-sm rounded flex flex-row items-center cursor-pointer">
                                <AddIcon fontSize="small" />
                                <p>New product</p>
                            </span>
                        </div>

                        {/* modal to add product */}
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={`${classes.paper}` + 'flex flex-col bg-white border-none outline-none rounded p-4 md:w-3/5 w-full'}>
                                    <p id="transition-modal-title font-semibold text-gray-700" cla>Create a new product</p>
                                    <input
                                        type="text"
                                        id="name"
                                        onChange={e => setProductName(e.target.value)}
                                        placeholder="Enter product name"
                                        className="border-2 w-full my-2 border-gray-400 rounded p-2" />
                                    <div className="first grid md:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
                                        <select
                                            defaultValue=""
                                            onChange={e => setNewCategory(e.target.value)}
                                            id="category"
                                            className="border-2 text-xs w-full col-span-1 border-gray-400 p-2 text-gray-700 rounded">
                                            <option disabled={true} value="">Select Category</option>
                                            {apiCats?.map(cat => (
                                                <>
                                                    {/* {getSubCategories(cat._id)} */}
                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                </>
                                            ))}
                                        </select>
                                        <select
                                            defaultValue=""
                                            onChange={e => setNewSubCategory(e.target.value)}
                                            id="subcategory"
                                            className="border-2 text-xs col-span-1 w-full border-gray-400 p-2 text-gray-700 rounded">
                                            <option disabled={true} value="">Select Subcategory</option>
                                            {apiSubCats?.map(subcat => (
                                                <option key={subcat._id} value={subcat.name}>{subcat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="text-xs text-gray-700 font-semibold mt-4">Media</p>
                                    <div className="upload-section flex cursor-pointer flex-col items-center border-dashed border-gray-300 p-2 rounded border-2 mt-1 mb-4">
                                        <Dropzone onDrop={onDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps({ className: 'drop-zone w-full' })} ref={dropRef}>
                                                    <input {...getInputProps()} />
                                                    <div className="bg-gray-100 p-2 text-gray-400 flex flex-col items-center rounded outline-none border-none">
                                                        <AddAPhotoIcon fontSize="large" />
                                                    </div>
                                                    {picture && (
                                                        <div>
                                                            <p className="font-semibold text-gray-700 text-sm">Selected file:</p> {picture.name}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                        {previewSrc ? (
                                            isPreviewAvailable ? (
                                                <div className="image-preview">
                                                    <Avatar variant="rounded" src={previewSrc} />
                                                </div>
                                            ) : (
                                                <div className="preview-message">
                                                    <p>No preview available for this file</p>
                                                </div>
                                            )
                                        ) : (
                                            <div className="font-semibold text-gray-700 text-xs ml-2">
                                                <p>Drag images here or click to browse</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3 grid-cols-1 items-center">
                                        <input
                                            type="number"
                                            id="name"
                                            onChange={e => setPrice(e.target.value)}
                                            placeholder="Product price"
                                            className="border-2 w-full col-span-1 my-2 border-gray-400 rounded p-2" />
                                        <input
                                            type="number"
                                            id="name"
                                            onChange={e => setDiscountPrice(e.target.value)}
                                            placeholder="discount price"
                                            className="border-2 w-full my-2 col-span-1 border-gray-400 rounded p-2" />
                                    </div>
                                    <textarea
                                        type="text"
                                        id="name"
                                        onChange={e => setDescripiton(e.target.value)}
                                        placeholder="product description"
                                        className="border-2  w-full my-2 border-gray-400 rounded p-2" />

                                    <Tags selectedTags={selectedTags} />
                                    <div className="flex flex-row items-center self-end mt-4">
                                        <div className="flex-1"></div>
                                        <button onClick={handleClose} className="flex text-xs flex-row items-center flex-end bg-red-500 text-white p-1 rounded">
                                            <CloseIcon fontSize="small" />
                                            <p>Cancel</p>
                                        </button>
                                        {!sent ? (<button onClick={createProduct} className="flex flex-row ml-4 text-xs items-center flex-end bg-green-500 text-white p-1 rounded">
                                            <AddIcon fontSize="small" />
                                            <p>Add</p>
                                        </button>) : (<button className="text-green-600">
                                            <CheckCircleIcon />
                                        </button>)}
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                     
                        {/* table to view products */}
                        
                        <ProductsTable/>

                    </div>
                </div>
            </div>
        </StoreDashboard>
    );
}

export default Inventory