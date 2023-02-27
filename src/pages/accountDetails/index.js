import React, { useState } from "react";
import "./styles.css";

export function AccountDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const options = ["Tempe", "Poly", "West", "Downtown"];

  const handleEdit = () => {
    setEditMode(true);
  };

  const [selected, setSelected] = useState(options[0]);
  const submit = () => {
    console.log(selected);
  };

  const handleSave = () => {
    setEditMode(false);
    // Save name, email, and picture to some data store
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="account-details-container">
      <div className="form-group">
        <label htmlFor="picture">Profile Picture:</label>
        <input
          className="textInput"
          id="picture"
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
          disabled={!editMode}
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
        <label htmlFor="firstName">First Name:</label>
        <input
          className="textInput"
          id="firstName"
          type="text"
          value={name}
          onChange={(edit) => setName(edit.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          className="textInput"
          id="lastName"
          type="text"
          value={name}
          onChange={(edit) => setName(edit.target.value)}
          disabled={!editMode}
        />
      </div>

      <div className="form-group">
        <label htmlFor="campus">Campus Location:</label>
        <select
          className="locationSelect"
          id="campus"
          value={selected}
          disabled={!editMode}
          onChange={(edit) => setSelected(edit.target.value)}
        >
          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          className="textInput"
          id="email"
          type="email"
          value={email}
          onChange={(edit) => setEmail(edit.target.value)}
          disabled={!editMode}
        />
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
