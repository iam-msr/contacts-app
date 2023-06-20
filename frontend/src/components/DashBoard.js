import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Axios from 'axios';

const DashBoard = () => {
  const { logout } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const host = "http://localhost:5000"

  const fetchContacts = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await Axios.get(`${host}/api/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setContacts(response.data); // Assuming setContacts is a state setter function
  } catch (error) {
    console.error('Error fetching contacts:', error);
    // Handle error (e.g., show error message)
  }
};

const addContact = async (name, email, phone) => {
  const token = localStorage.getItem('token');
  try {
    const response = await Axios.post(`${host}/api/contacts`, { name, email, phone }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    
    setContacts([...contacts, response.data]); // Assuming setContacts is a state setter function
    
  } catch (error) {
    console.error('Error adding contact:', error);
    // Handle error (e.g., show error message)
  }
};

  return (
    <div className="container">
      <h1>Contacts</h1>
      <button onClick={logout}>Logout</button>
      <div >
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <button onClick={() => addContact(name, email, phone)}>Add Contact</button>

      </div>
      <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                      <button className='btn btn-edit'>Edit</button>
                      <button className='btn btn-delete'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DashBoard;
