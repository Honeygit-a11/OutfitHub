import React, { useContext, useState } from 'react'
import '../Style/CheckoutForm.css'
import { ShopContext } from '../context/shopcontext';

const CheckoutForm = ({ onSubmit }) => {
  const [address, setAddress] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId,setEditingId]=useState(null);
  const {getTotalCartAmount} = useContext(ShopContext)
  const [formData, setFromData] = useState({
    name: '',
    email: "",
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  const handleAddAddress = () => {
    setAddress([...address, { id: Date.now(), ...formData }]);
    setFromData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setShowForm(false);
  }
  const handleEdit=(addr)=>{
    setFromData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  }
  return (
    <>
      <div className="shipping-container">

        <h2 className="shipping-heading">Delivery to</h2>
        <div
          className="add-address"
          onClick={() => {setShowForm(true)
            setEditingId(null);
          }
  }
        >
          <span>+ ADD ADDRESS</span>
        </div>


        {showForm && (
          <div className="address-form">
            <input type='text'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
              required />

            <input
              type='email'
              name='email'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
              required />

            <input
              type='tel'
              name='phone'
              placeholder='Phone Number'
              value={formData.phone}
              onChange={handleChange}
              required />

            <textarea
              name='address'
              placeholder='Full Adresss'
              value={formData.address}
              onChange={handleChange}
              required />
            <input
              type='text'
              name='city'
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              required />
            <input
              type='text'
              name='state'
              placeholder='State'
              value={formData.state}
              onChange={handleChange}
              required />
            <input
              type='number'
              name='pincode'
              placeholder='Pincode'
              value={formData.pincode}
              onChange={handleChange}
              required />

            <button onClick={handleAddAddress}>{editingId ? 'Update Address' : "save address"}</button>
          </div>
        )}

        <div className="saved-addresses">
          {address.map((addr) => (
            <div key={addr.id} className="address-card">
              <p style={{fontWeight:600,fontSize:30,}}>Delivery address</p>
              <h3>{addr.name}</h3>
              <p><strong>Email:</strong> {addr.email}</p>
              <p><strong>Phone:</strong> {addr.phone}</p>
              <p><strong>Address:</strong> {addr.address}</p>
              <p>
                <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode}
              </p>
              <div className="address-actions">
              <button className="deliver-btn" onClick={()=> handleEdit(addr)}>Change</button>
              </div>
          <div className="payment-info">
          <h3>Total Cost : ₹{getTotalCartAmount()}</h3>
          <button className='payment-btn'>Proceed to payment</button>
          </div>
            </div>
          ))}
        </div>
        
        
      </div>


    </>
  )
};

export default CheckoutForm;