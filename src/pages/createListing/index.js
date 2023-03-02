export function ProductListing(){
    return (
        <form>
            <label for="title">Title:</label> 
            <input type="text" id="title" name="title"></input><br></br>

            <label for="description">Description of product:</label> 
            <input type="text" id="description" name="description"></input><br></br>

            <label for="category">Category*:</label> 
            <input type="text" id="category" name="category" required></input><br></br>

            <label for="condition">Condition*:</label> 
            <input type="text" id="condition" name="condition" required></input><br></br>

            <label for="YMM">Year, Make, and/or Model</label> 
            <input type="text" id="YMM" name="YMM"></input><br></br>

            <input type="submit" value="Submit"></input>
        </form>
    )
}