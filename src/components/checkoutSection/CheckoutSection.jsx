import React from 'react'
import Billing from '../Billing.jsx/Billing';
import CheckoutForm from '../CheckoutForm';

const CheckoutSection = () => {
  return (
    <>
    <div>
    <CheckoutForm/>
    </div>
    <div>
      <Billing/>
    </div>
    </>
  )
}

export default CheckoutSection;
