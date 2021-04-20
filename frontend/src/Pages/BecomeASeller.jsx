import React, { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import General from '../Layout/General'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { apiUrl } from '../API/apiUrl'
import { useHistory } from 'react-router'



function BecomeASeller() {
    const [address, setAddress] = useState('')
    const [picture, setPicture] = useState(null)
    const [previewSrc, setPreviewSrc] = useState('')
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)
    const dropRef = useRef();
    const history = useHistory()

    const user = localStorage.getItem('zomuser')

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

    const becomeSeller = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('proPictures', picture);
        formData.append('location', address);

        fetch(`${apiUrl}/user/location/add/${JSON.parse(user).user_id}`,
            {
                method: "PATCH",
                // headers: { "Content-Type": "multipart/form-data" },
                body: formData
            }).then(response => {
                console.log(response.status);
                // localStorage.setItem('zomuser', JSON.stringify(response.data.user))
                history.push('/sellerlogin')
            }).then(data => console.log(data));
    }


    return (
        <General>
            <div className="p-16">
                <p className="text-gray-700 text-semibold text-center md:text-2xl text-sm">For you to become a seller we will need this following information about you</p>
                <div className="flex flex-col items-center">
                    <form onSubmit={becomeSeller} action="" className="flex flex-col md:w-2/5 w-full my-4">
                        <label htmlFor="location" className="text-gray-700 text-sm mb-1 font-semibold">Location</label>
                        <input
                            type="text"
                            id="location"
                            onChange={e => setAddress(e.target.value)}
                            placeholder="City you operate in" className="border-2 border-green-400 rounded p-2" />
                        <div className="upload-section flex flex-row items-center mt-8">
                            <Dropzone onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                        <input {...getInputProps()} />
                                        <div className="bg-gray-200 p-2 text-gray-400 flex flex-col items-center rounded outline-none border-none">
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
                                        <img className="preview-image w-48 h-48 ml-8 rounded shadow" src={previewSrc} alt="Preview" />
                                    </div>
                                ) : (
                                    <div className="preview-message">
                                        <p>No preview available for this file</p>
                                    </div>
                                )
                            ) : (
                                <div className="font-semibold text-gray-700 text-sm ml-2">
                                    <p>Select display picture</p>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="bg-green-500 font-semibold text-xs w-2/5 mt-2 rounded text-white py-2 px-1 self-end">Start Selling</button>
                    </form>
                </div>
            </div>
        </General>
    )
}

export default BecomeASeller
