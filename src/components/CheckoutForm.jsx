import React, { useState } from 'react'
import '../Style/CheckoutForm.css'

const CheckoutForm = ({onSubmit}) => {
    const [formData , setFromData] = useState({
        name:'',
        email:"",
        phone:'',
        address:'',
        city:'',
        state:'',
        pincode:'',
    });
      const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

    const handleSumbit = (e)=>{
        e.preventDefault();
        onSubmit(formData);
    }
  return (
    <>
    <div className='checkout-form'>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSumbit}>
            <input type='text'
            name='name'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            required/>

            <input
            type='email'
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
            required/>

            <input
            type='tel'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            required/>

            <textarea
            name='address'
            placeholder='Full Adresss'
            value={formData.address}
            onChange={handleChange}
            required/>
            <input
            type='text'
            name='city'
            placeholder='City'
            value={formData.city}
            onChange={handleChange}
            required/>
            <input 
            type='text'
            name='state'
            placeholder='State'
            value={formData.state}
            onChange={handleChange}
            required/>
            <input
            type='number'
            name='pincode'
            placeholder='Pincode'
            value={formData.pincode}
            onChange={handleChange}
            required/>

            {/* <button type='sumbit'>Proceed to Payment</button> */}
        </form>
    </div>
      
    </>
  )
}

export default CheckoutForm
