import React from "react";
import CloseIcon from '@material-ui/icons/Close';

const Tags = (props) => {

    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="tags-input border-2 border-gray-300 p-1 rounded flex flex-row flex-wrap">
            <ul className="flex flex-row items-center flex-wrap">
                {tags.map((tag, index) => (
                    <li key={index} className="border-gray-400 text-gray-500 border flex px-1 flex-row items-center rounded-full">
                        <span>{tag}</span>
                        <i
                            className="material-icons"
                            onClick={() => removeTags(index)}
                        >
                            <CloseIcon fontSize="small" className="cursor-pointer"/>
                        </i>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
                className="border-none outline-none flex-1"
            />
        </div>
    );
};
export default Tags;