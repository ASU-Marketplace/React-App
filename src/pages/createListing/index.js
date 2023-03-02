export function ProductListing(){
    return (
        <form>
            <label for="title">First name:</label> 
            <input type="text" id="title" name="Title"></input><br></br>
            <label for="description">Last name:</label> 
            <input type="text" id="description" name="Enter description of item"></input><br></br>
            <input type="submit" value="Submit"></input> 
        </form>
    )
}