import React from "react"
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
const [users, setUsers] = useState([]);

useEffect(()=>{
  getUsers();
},[]);

const getUsers = async () => {
  const response = await axios.get("http://localhost:5000/users");
  setUsers(response.data);
}

const deleteUser = async (id) => {
  try{
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  } catch (error){
    console.log(error);
  }
}

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/add`} className="button is-success">Add Data</Link>
        <table className="table is-stripped is-fullwidth mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
              <td>{index+1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Link 
                to={`/edit/${user.id}`} 
                className="button is-small is-info mr-1">Edit</Link>
                <button 
                onClick={()=>deleteUser(user.id)}
                className="button is-small is-danger">Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList