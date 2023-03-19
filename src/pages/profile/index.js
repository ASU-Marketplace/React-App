
import { auth } from "../../firebase";

export function Profile(){
    const user = auth.currentUser;

    return (
        <div>
            <h1>My Profile</h1>
            <h2>Currently Logged in as: </h2> {user?.email}
        </div>   
    );
     
}       