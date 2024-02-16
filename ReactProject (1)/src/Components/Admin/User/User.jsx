import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
// import { Link } from 'react-router-dom'

export default function User() {
    let [data, setData] = useState([])
    async function deleteItem(_id) {
        if (window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")) {
            let response = await fetch("/api/user/" + _id, {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            getAPIData()
        }
    }
    async function getAPIData() {
        var response = await fetch("/api/user", {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        setData(response.data)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>User List</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>UserName</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.role}</td>
                                                <td><button className='btn' onClick={() => deleteItem(item._id)}><i className='fa fa-trash text-danger'></i></button></td>
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
