import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
export default function AdminCheckout() {
    let [data,setData] = useState([])
    let dispatch = useDispatch()
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function getAPIData() {
        dispatch(getCheckout())
        if(CheckoutStateData.length){
            setData(CheckoutStateData.slice(1).reverse())
        }
    }
    function getDate(a){
        let date = new Date(a)
        return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Checkout</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>UserId</th>
                                        <th>Order Status</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Status</th>
                                        <th>Subtotal</th>
                                        <th>Shipping</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.userid}</td>
                                                <td>{item.orderstatus}</td>
                                                <td>{item.paymentmode}</td>
                                                <td>{item.paymentstatus}</td>
                                                <td>&#8377;{item.subtotal}</td>
                                                <td>&#8377;{item.shipping}</td>
                                                <td>&#8377;{item.total}</td>
                                                <td>{getDate(item.date)}</td>
                                                <td><Link to={`/admin/checkout/show/${item.id}`}><i className='fa fa-eye text-success'></i></Link></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
