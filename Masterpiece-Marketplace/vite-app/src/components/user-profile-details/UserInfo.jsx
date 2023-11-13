import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'
import { BASE_DB_URL } from '../../globals'
   

export default function UserInfo() {
  const { loggedInUser, setIsLoggedInUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(loggedInUser.username);
  const [password, setPassword] = useState(loggedInUser.password);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make a PUT request to update the user's information
      await axios.put(`${BASE_DB_URL}users/update/${loggedInUser._id}/`, {
        username,
        password,
      });

      // Fetch the updated user information from the API
      const response = await axios.get(`${BASE_DB_URL}users/${loggedInUser._id}`);
      const updatedUserInfo = response.data;

      // Update the loggedInUser and set isEditing to false
      setIsLoggedInUser(updatedUserInfo);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="UserInfo">
      <div>
        <label htmlFor="username">Username:</label>
        {isEditing ? (
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        ) : (
          <span>{username}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        {isEditing ? (
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        ) : (
          <span>{password}</span>
        )}
      </div>
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}