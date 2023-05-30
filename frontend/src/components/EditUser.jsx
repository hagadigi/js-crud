import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const navigate = useNavigate();
const {id} = useParams();

const updateUser = async (e) => {
  e.preventDefault();
  try{
    await axios.patch(`http://localhost:5000/users/${id}`,{
      firstName,
      lastName,
      phoneNumber
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getUserById();
}, []);

const getUserById = async () => {
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  setFirstName(response.data.firstName);
  setLastName(response.data.lastName);
  setPhoneNumber(response.data.phoneNumber);
}

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form action="" onSubmit={updateUser}>
          <div className='field'>
            <label htmlFor="" className="label">First Name</label>
            <div className="control">
              <input type="text" className="input" placeholder='First Name' value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">Last Name</label>
            <div className="control">
              <input type="text" className="input" placeholder='Last Name' value={lastName}
              onChange={(e) => setLastName(e.target.value)}  />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">Phone Number</label>
            <div className="control">
              <input type="text" className="input" placeholder='Phone Number' value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser