import React, { useState } from "react";
import "./styles.css";
import { auth, db, storage } from "../../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate} from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export function AccountDetails() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const options = ["Tempe", "Poly", "West", "Downtown", "Online"];

  let navigate = useNavigate(); 

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
              displayName: name,
              email: email,
              photoURL: downloadURL,
            });
          } catch (err) {
            console.log(err);
            setErrorMessage("Information could not be saved, please try again!");
          }
        });
      }).then(
        setErrorMessage("Changes saved successfully!!")
      );
      setErrorVisible(true);
      setOpen(true); 
      setEditMode(false);
    
  };

  const handlePictureChange = (event) => {
    if (event.target.files[0] != user.photoURL){
      setPicture(event.target.files[0]);
      setPreviewURL(URL.createObjectURL(event.target.files[0]));
    } else {
      setPicture(user.photoURL);
    }
    
    
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
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
        </div>
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

      <div className="form-group">
        <label htmlFor="lastName">Display Name:</label>
        <input
          className="textInput"
          id="lastName"
          type="text"
          placeholder={user.displayName}
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
    {isErrorVisible && <Snackbar open={open} message={errorMessage} onClose={handleClose} autoHideDuration={3000} action={action}/>}
    </>
  );
}
