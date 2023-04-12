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

    const handleCreate = () => {
        setEditMode(false);
    }

    const handlePictureChange = (event) => {
        setPicture(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const [selectedCondition, setSelectedCondition] = useState(condition[0]);
    const [selectedCategory, setSelectedCategory] = useState(category[0]);
    const submit = () => {
        console.log("Selected Condition: " + selectedCondition);
        console.log("Selected Category: " + selectedCategory);
    };

    return (
        <div className="create-listing-container">
            <div className="form-group">
                <label htmlFor="picture">Item Picture:</label>
                <input
                    className="textInput"
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                />
                {previewURL && (
                    <div>
                        <p>Preview:</p>
                        <img
                            src={URL.createObjectURL(picture)}
                            width="50"
                            height="50"
                        />
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
                {
                    <button className="btn-save" onClick={handleCreate}>
                        Create Listing
                    </button>
                }
            </div>    
        </div>
        
    );
}