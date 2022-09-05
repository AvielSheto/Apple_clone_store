import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TotalPurchases from './TotalPurchases';
// style scss
import '../style/_products.scss'
// mui
import Typography from '@mui/material/Typography';
import AllCustomers from './AllCustomers';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

export default function Products() {
    const storeData = useSelector((state) => state);
    return (
        <div>
            <Container>
                <div style={{ margin: "1rem", padding: "1rem", borderRadius: "15px", backgroundColor: "white", opacity: "0.8", textAlign: "center" }}>
                    <TotalPurchases />
                    {/* <h2>All Products</h2> */}
                    <Typography style={{ textAlign: 'left' }} variant="h3" >All Products</Typography>
                </div>

                {storeData.products.map((item, index) => {
                    let ProductId = item.id
                    return (<div key={index} className="product">

                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography style={{ textAlign: 'left' }} variant="h4" gutterBottom>Product ID: {item.id}</Typography>
                            <Link to={`/editProduct/${item.id}`}><Fab color="info" aria-label="edit"><EditIcon/></Fab></Link>                        
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-between", padding: "1rem" }}>
                            <div>
                                <p><strong>Product Name: </strong>{item.name}</p>
                                <p><strong>Product Price: </strong>{item.price}</p>
                                <p><strong>Quantity: </strong>{item.quantity}</p>
                            </div>
                            <div>
                                <img style={{ height: "12rem", width: "16rem" }} src={item.img} alt="" />
                            </div>
                        </div>
                        <div>
                            <Typography style={{ textAlign: 'left' }} variant="h3" >Purchases</Typography>
                            <br />
                            <AllCustomers id={ProductId} />
                            <br />
                        </div>
                    </div>
                    )
                })}
                <br />
                <br />
            </Container>
        </div>
    )
}
