import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// bootstrap
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';



export default function EditCustomer() {
    const storeData = useSelector(state => state)
    const { id } = useParams();
    const dispatch = useDispatch()
    const [customer, setCustomer] = useState({ id: id, first: "", last: "", city: "" });

    const updateCustomer = () => {
        const action = { type: "UPDATECUSTOMER", payload: customer }
        dispatch(action)
    }
    const deleteCustomer = () => {
        const action = { type: "DELETECUSTOMER", payload: customer.id }
        dispatch(action)
    }

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <div className='regionOne' style={{ margin: "2rem", padding: "2rem", border: "2px solid black", borderRadius: "15px" }}>
                <h1 style={{ textAlign: 'center' }}>Edit Customer</h1>

                <h3>Edit Customer ID : {id}</h3>

                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <TextField onChange={handleChange} name='first' label="First Name:" variant="outlined" />
                    <br />
                    <TextField onChange={handleChange} name='last' label="Last Name:" variant="outlined" />
                    <br />
                    <TextField onChange={handleChange} name='city' label="City:" variant="outlined" />
                </div>


                <Form>
                   
                    <br />
                    <div style={{ display: 'flex', justifyContent: "space-evenly", padding:"0px 30%" }}>
                        <Button onClick={updateCustomer} variant="contained">Update</Button>
                        <Button onClick={deleteCustomer} variant="contained">Delete</Button>
                    </div>

                </Form>

            </div>

            <div className='regionTwo' style={{ margin: "2rem", padding: "2rem", border: "2px solid black", borderRadius: "15px" }}>
                <h2 style={{ textAlign: 'center' }}>purchases History</h2>
                {storeData.purchases.filter(purchases => purchases.customerId == id).map((Purchase, index) => {
                    return (<div key={index} style={{ margin: "2rem", padding: "2rem", border: "2px solid black" }}>
                        <p><strong>Product ID: </strong><Link to={`/editProduct/${Purchase.productId}`}>{Purchase.productId}</Link></p>
                        <p><strong>Purchase ID: </strong>{Purchase.id}</p>
                        <p><strong>Purchase Date: </strong>{Purchase.date}</p>
                    </div>)
                })}
            </div>
        </Container>
    )
}