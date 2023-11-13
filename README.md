# Masterpiece Marketplace
*Have you ever thought eBay had too many car parts and junk?<br>
Have you ever thought Etsy was too down-market?<br>
Have you ever thought Christie's had too many people between the Buyer and Seller?*

Welcome to Masterpiece Marketetplace, a new an intuitive way to discover and bid on art!

### Tech and Installation
This is a full MERN-stack web application using the following packages (see more in package.json):
    
    Back-End
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^7.6.4",
    "morgan": "^1.10.0",

    Front-End
    "vite": "^4.4.5"
    "react": "^18.2.0",
    "react-router-dom": "^6.18.0"
    "react-dom": "^18.2.0",
    "axios": "^1.6.1",

Backend and Frontend applications are nested within this repo as follows: <br>
-> **Repo** - MasterpieceMarketplace <br>
--> **Backend** - Masterpiece-Marketplace<br>
---> **Frontend** - vite-app

#### Initialization
To initialize the backend in terminal:<br>
1. Navigate to Repo/Masterpiece-Marketplace
2. `npm install` to install all packages. Package updates may be needed.
3. `node seeds/seed.js` to seed the database
4. `npm run dev` to run the database server locally.

To initialize the frontend in terminal (must be done separately and simultaneously with the backend server):<br>
1. Navigate to Repo/Masterpiece-Marketplace/vite-app
2. `npm install` to install all packages. Package updates may be needed.
3. `npm run dev` to run the frontend server locally.

### Credits and Acknowledgements
#### Collaborators
- Sammy Marks
- Tahmid Sheikh
- Blen Tesfaye
- Kevin Barber

#### Images
- Wikimedia public commons

#### Code snippets
- General Assembly Instructors
- StackOverflow
- Additional sources noted in in-line comments
______________


# Presentation

## Overview
*Have you ever thought eBay had too many car parts and junk?<br>
Have you ever thought Etsy was too down-market?<br>
Have you ever thought Christie's had too many people between the Buyer and Seller?*

Welcome to **Masterpiece Marketetplace**, a new an intuitive way to discover and bid on art!

### Features and Screens
Main features, screens, and user flows include:
- Header with Nav bar
- Landing Page
- Login Page
- Discover (Search)
- Search Results
- Artist, Artwork, and Auction Details
- UserProfile
- MyArtistProfile (Create, edit, and view Artwork and Auctions)
- MyBuyerProfile (View Artwork and Auctions)


[Wireframe](https://www.figma.com/file/7rrjdNoFgBpLmxUejqzCsm/SKBT-Masterpiece-Marketplace?type=design&node-id=34%3A1419&mode=design&t=xVd0BcF4dZBNvjld-1)

![Wireframe](./ReadMe%20Assets/Wireframe.png)

### React Components
30+ Components off of 7 primary App branches:
1. Header
2. Main -> Landing Page
3. Main -> User Profile
4. Main -> Discover
5. Main -> MyArtistProfile
6. Main -> MyBuyerProfile
7. Main -> Multiple -> Artist/Artwork/Auction Details

[Component Hierarchy Diagram](https://lucid.app/lucidchart/459a6dde-938b-4fd2-b037-172cddd85463/edit?invitationId=inv_7c2bc8f1-57fc-447b-b75a-9d7f966fc74a&page=0_0#)
![Component Hierarchy Diagram](./ReadMe%20Assets/ComponentHierarchy.png)

### Database
Four Models:
1. Users
2. Artwork (with Users)
3. Auctions (with Users, Artwork)
4. Bids (with Users, Auctions)

[Entity Relationship Diagram](https://lucid.app/lucidchart/30a5418d-be68-4fa2-a273-90a252a9af55/edit?invitationId=inv_fb9edd0d-e6ca-4dfb-915b-529c158d60de&page=0_0#)

![Entity Relationship Diagram](./ReadMe%20Assets/ERD.png)

## Demo
10 minutes

## Functionality and Code Highlights

#### Discover (Search Page)
- Search validation for multiple input requirements
```
const handleSearchSubmit = async (event) => {
    event.preventDefault()
    if(searchCategory != "none" && searchText.length>0) {
        setSearchResultsMessage(`Showing ${searchCategory} results with "${searchText}"`)
        categoryRouter()
    } else {
        if (searchCategory=="none" && searchText.length==0) {
            setSearchResultsMessage("Please enter a search category and name or description")
        } else if (searchCategory=="none") {
            setSearchResultsMessage("Please enter a search category")
        } else if (searchText.length==0) {
            setSearchResultsMessage("Please enter a name or description")
        }
    } 
}
```

- $regex database controllers that a) allow flexible search and b) populate nested schemas in the results
```        
const searchAuctions = await Auction.find({$or:[
        {"title": { "$regex" : searchText, "$options" : "i"}},
        {"description": { "$regex" : searchText, "$options" : "i"}},
    ]})
    .populate([{path:'artistSeller', model: User}, {path:'artworkIncluded', model: Artwork}])
    .exec()
```

#### Auction Details
- Countdown Timer (reset "current date" every 1000 milliseconds)
```
useEffect(()=>{
        const i = setInterval(()=>{
            console.log("auction is refreshing")
            getAuctionStatus()
            setCurrentDate(new Date())     
        }, 1000)
        return () => clearInterval(i);
    },[])
```

- Rendering Details Based on Auction Status
```
{ auctionStatus == "Pending" ? 
    <>
        <div className='auction-time-until'><span className='auction-detail-category-title'>Time Until Start: </span>{millisecondsToDateString(start-currentDate)}</div>
    </>
    : null}
{ auctionStatus == "Active" ? 
    <>
        {/* {loggedInUser && <CreateBid auctionId={auctionDetailID} />} */}
        {loggedInUser && <CreateBid />}

        <div className=' auction-details-text auction-time-until'><span className='auction-detail-category-title'>Remaining Time: </span>{millisecondsToDateString(end-currentDate)}</div>
        {bids.length>0 ? 
            <AuctionBidStats bids={bids} />
            :
            <div>There are no bids in auction</div>
        }
    </>
: null}
{ auctionStatus == "Resolved" ? 
    <>
        {bids.length>0 ? 
            <AuctionBidStats bids={bids} />
            :
            <div>There are no bids in auction</div>
        }
    </>
: null}
{ auctionStatus == "Unresolved" ? 
    <>
        {bids.length>0 ? 
            <AuctionBidStats bids={bids} />
            :
            <div>There are no bids in auction</div>
        }
    </>
: null}
```

#### MyArtistProfile
- Dynamically click between Artwork and Auctions by setting components in state
```
const [viewWindow, setViewWindow] = useState(<CreatedArtwork />)

return(
    <button 
        className='profile-create-btn' 
        onClick={() => setViewWindow(<CreatedArtwork/>)}
    >My Artwork</button>
    <button 
        className='profile-create-btn'
        onClick={() => setViewWindow(<CreatedAuctions/>)}
    >My Auctions</button>
)

```

#### Nav Bar
- Hamburger Menu with Conditional Rendering based on login state
```
<div className={`menu-links ${menuOpen ? 'open' : ''}`}>
    <Link to="/" onClick={closeMenu}>Home</Link>
    {loggedInUser ?
        <>
        <Link to="/profile" onClick={closeMenu}>My Profile</Link>
        <Link to="/artist-dashboard" onClick={closeMenu}>Artist Dashboard</Link>
        <Link to="/buyer-dashboard" onClick={closeMenu}>Buyer Dashboard</Link>
        </>                
        :
        null
    }
    <Link to="/discover" onClick={closeMenu}>Discover</Link>
</div>
```

#### Home Page
- Cycling Images every 10 seconds
```
useEffect(() => {
    if (artworkImages.length > 0) {
      
      const interval = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % artworkImages.length)
      }, 10000)

      return () => {
        clearInterval(interval) 
      }
    }
}, [currentIndex, artworkImages])

useEffect(() => {
   
    setCurrentImages([
      artworkImages[currentIndex],
      artworkImages[(currentIndex + 1) % artworkImages.length],
      artworkImages[(currentIndex + 2) % artworkImages.length],
    ])
}, [currentIndex, artworkImages])
```

#### Login Functionality
- Show profile picture when user is logged in
```
{loggedInUser && profilePic && (
    <Link to="/profile">
        <div className='pfp'>
            <img src={profilePic} alt="Profile Pic" style={profilePicStyle} id='pfp'/>
        </div>
    </Link>
)}

```

- Username Lookup and Match
```
const handleLogin = async () => {

    try {
        const response = await axios.get('http://localhost:3001/users')
        const users = response.data

        // check if there is a user with the provided username and password
        const loggedInUser = users.find(
            (user) => user.username === username && user.password === password
        )
        if (loggedInUser) {
            setLoggedInUser(loggedInUser)
            console.log(loggedInUser)
            navigate('/discover')
        } else {
            console.error('Invalid username or password')
            alert('Invalid username or password')
        }
    } catch (error) {
        console.error('Error during login:', error)
    }

}
```

## Reflection

#### Challenges
- Github challenges - divergent branches, needing to reclone, introduced unnecessary stress on the process
- Had to refactor our entire App on Day 2 of coding, had Backend inside of FrontEnd, instead of FrontEnd inside of BackEnd
- Bit off more than we could chew - trying to build Etsy+eBay in a week is complicated
- Never landed on a good cadence for repo commits and merges
- Styling got deprioritized because the team oriented towards JS

#### Successes
- Robust planning with our **Trello Board** and [**Planning Document**](https://docs.google.com/document/d/1JFqjB5XQ2yDp60qYtSKiLBQ3iIpv-IJiuFeFtsaT1Ug/edit?usp=sharing)
- Really good communication in the first couple of days when we were building the wireframe, component hierarchy, backend, and frontend boilerplate simultaneously. It all came together nicely.
- Used the wireframe to psuedo-code front- and back-end functionaly.
- After the initial planning, able to delegate and compartmentalize. E.g., Kevin on db controllers, Sammy on Search and Auctions, Blen on Artists/Artwork, Tahmid on overall styling and Login
- Good backlog of non-MVP items that we didn’t get to and were okay with it


**Trello Board**
![Alt text](./ReadMe%20Assets/trello.png)



