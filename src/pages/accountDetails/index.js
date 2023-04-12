import React, { useState } from "react";
import "./styles.css";
import { auth, db, storage } from "../../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function AccountDetails() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const options = ["Tempe", "Poly", "West", "Downtown", "Online"];

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  const handleEdit = () => {
    setEditMode(true);
  };

  const [selected, setSelected] = useState(options[0]);
  const submit = () => {
    console.log(selected);
  };

  const handleSave = async() => {
    // Save name, email, and picture to some data store
    const date = new Date().getTime();
    const storageRef = ref(storage, `${user.displayName + date}`);

    await uploadBytesResumable(storageRef, picture).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(user, {
            photoURL: downloadURL,
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
    
  };


  return (
    <div className="account-details-container">
      <h2>Currently Logged in as: {user?.email} </h2> 
      <img src={user.photoURL} alt="" style={{width:"30%", borderRadius:"100px", height:"auto", display:"flex", justifyContent:"center"}}/>
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

      {/* <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          className="textInput"
          id="firstName"
          type="text"
          value={name}
          onChange={(edit) => setName(edit.target.value)}
          disabled={!editMode}
        />
      </div> */}

      <div className="form-group">
        <label htmlFor="lastName">Display Name:</label>
        <input
          className="textInput"
          id="lastName"
          type="text"
          value={user.displayName}
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
          value={user.email}
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
