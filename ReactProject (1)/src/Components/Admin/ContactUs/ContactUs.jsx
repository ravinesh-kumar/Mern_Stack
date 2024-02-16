import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContactUs, getContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
export default function ContactUs() {
    let [data,setData] = useState([])
    let dispatch = useDispatch()
    let ContactUsStateData = useSelector((state) => state.ContactUsStateData)
    function deleteItem(id){
        if(window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")){
           dispatch(deleteContactUs({id:id})) 
           getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getContactUs())
        if(ContactUsStateData.length){
            setData(ContactUsStateData.slice(1).reverse())
        }
    }
    function getDate(a){
        let date = new Date(a)
        return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
    }
    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>ContactUs</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.subject.slice(0,100)+"..."}</td>
                                                <td>{getDate(item.date)}</td>
                                                <td>{item.status}</td>
                                                <td><Link to={`/admin/contactus/show/${item.id}`}><i className='fa fa-eye text-success'></i></Link></td>
                                                <td>
                                                    {
                                                        item.status!=="Active"?
                                                        <button className='btn' onClick={()=>deleteItem(item.id)}><i className='fa fa-trash text-danger'></i></button>:
                                                        ""
                                                    }
                                                </td>
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
