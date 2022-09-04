import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AllCustomers(props) {
  const storeData = useSelector(state => state)
  const dispatch = useDispatch()
  const [showProducts, setShowProducts] = useState(false)
  const [showSaveBtn, setShowSaveBtn] = useState(false)
  const [showAddBtn, setShowAddBtn] = useState(true)
  const [product, setProduct] = useState([])


  const addProducts = () => {
    setShowProducts(!showProducts)
    setShowAddBtn(!showAddBtn)
    setShowSaveBtn(!showSaveBtn)
  }

  const SaveProducts = () => {
    setShowProducts(!showProducts)
    setShowSaveBtn(!showSaveBtn)
    setShowAddBtn(!showAddBtn)
    addToPurchases()
  }

  const addToPurchases = () => {
    const action = { type: "ADDPURCHASES", payload: product }
    dispatch(action)
  }

  return (
    <div>
      {storeData.purchases.filter(purchases => purchases.productId === props.id).map((item, index) => {
        let customerId = item.customerId
        let itemDate = item.date
        return <div key={index} style={{ margin: "0.5rem", padding: "2rem", border: "2px solid black", borderRadius:"15px"  }}>
          <h4>Customer ID: {item.customerId}</h4>
          <strong>Customer ID: </strong> <Link to={`/editCustomer/${item.customerId}`}>{item.customerId}</Link>
          <p><strong>Purchased Date: </strong> {item.date}</p>


          {showProducts && <div> {storeData.products.map((item, index) => {
            return (
            <div key={index} style={{ margin: "0.5rem", padding: "2rem", border: "2px solid black"}}>
              <strong>Product Name: </strong><Link to={`/editProduct/${item.id}`}>{item.name}</Link>
              <p><strong>Product Price: </strong>{item.price}</p>
              <p><strong>Quantity: </strong>{item.quantity}</p>
              <Button onClick={() => { setProduct({ ...product, id: "4", customerId: customerId, productId: item.id, date: itemDate }) }} variant="contained">Add</Button>
            </div>)
          })}
          </div>}

          <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
            {showAddBtn && <Button onClick={addProducts} variant="contained">Add Product</Button>}
            {showSaveBtn && <Button onClick={SaveProducts} variant="contained">Save</Button>}
          </div>
        </div>
      })}
    </div>
  )
}