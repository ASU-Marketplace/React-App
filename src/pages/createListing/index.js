import React, { useState } from "react";
import "./styles.css"

export function ProductListing(){
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [picture, setPicture] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const category = ["Apparel", "Technology", "Decor", "Other"];
    const condition = ["Poor", "Less than average", "Average", "Above average", "Mint"];
    const location = ["Tempe", "Poly", "West", "Downtown"];
    
    
    const handleEdit = () => {
        setEditMode(true);
    }

    const handleSave = () => {
        setEditMode(false);
    }

    const [image, SetImage] = useState([])
    

    const handlePictureChange = (event) => {
        setPicture(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const [selectedCondition, setSelectedCondition] = useState(condition[0]);
    const [selectedCategory, setSelectedCategory] = useState(category[0]);
    const [selectedLocation, setSelectedLocation] = useState(location[0]);
    const submit = () => {
        console.log("Selected Condition: " + selectedCondition);
        console.log("Selected Category: " + selectedCategory);
    };

    return (
        <div className="create-listing-container">
            <div className="form-group">
                <label htmlFor="picture">Item Picture:</label>
                <input
                    multiple
                    className="textInput"
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        SetImage(e.target.files)
                    }}
                    disabled={!editMode}
                />
                {(
                    <div>
                    {
                        Array.from(image).map(item => {
                            return (
                                <span>
                                    <img src={ item ? URL.createObjectURL(item) : null} 
                                    width="50"
                                    height="50"/>
                                </span>
                            )
                        })
                    }
                </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                    className="textInput"
                    id="itemName"
                    type="text"
                    value={name}
                    onChange={(edit) => setName(edit.target.value)}
                    disabled={!editMode}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Item Description: </label>
                <input
                    className="textInput"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(edit) => setDesc(edit.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Item Category:</label>
                <select
                    className="categorySelect"
                    id="category"
                    value={selectedCategory}
                    disabled={!editMode}
                    onChange={(edit) => setSelectedCategory(edit.target.value)}
                >
                    {category.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                    className="conditionSelect"
                    id="condition"
                    value={selectedCondition}
                    disabled={!editMode}
                    onChange={(edit) => setSelectedCondition(edit.target.value)}
                >
                    {condition.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                    className="locationSelect"
                    id="location"
                    value={selectedLocation}
                    disabled={!editMode}
                    onChange={(edit) => setSelectedLocation(edit.target.value)}
                >
                    {location.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                {editMode ? (
                    <button className="btn-save" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button className="btn-edit" onClick={handleEdit}>
                        Edit
                    </button>
                )}
            </div>    
        </div>
        
    );
}