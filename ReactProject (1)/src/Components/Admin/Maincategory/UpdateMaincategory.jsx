import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { updateMaincategory, getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
export default function UpdateMaincategory() {
    let [name, setName] = useState("")
    let [message, setMessage] = useState("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { _id } = useParams()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    function getInputData(e) {
        setMessage("")
        setName(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
        if (!name) {
            setMessage("Maincategory Name Must Required")
        }
        else if (name.length < 3 || name.length > 20) {
            setMessage("Maincategory Name Must Be Greater Then Or Equal to 3 And Less then Or Equal to 20")
        }
        else {
            let item = MaincategoryStateData.length && MaincategoryStateData.find((x) => x.name === name)
            if (item){
                setMessage("Maincategory Name Already Exist")
            }
            else {
                dispatch(updateMaincategory({ _id: _id, name: name }))
                navigate("/admin/maincategory")
            }
        }
    }
    function getAPIData() {
        dispatch(getMaincategory())
        if (MaincategoryStateData.length) {
            let item = MaincategoryStateData.find((x) => x._id === _id)
            if (item)
                setName(item.name)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Maincategory</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name='name' value={name} onChange={getInputData} className='form-control' placeholder='Name' />
                                {
                                    message?<p className='text-danger'>{message}</p>:""
                                }
                            </div>
                            <div className="mb-3">
                                <button type='button' className='btn btn-success w-50' onClick={() => window.history.back()}>Back</button>
                                <button type="submit" className='btn btn-primary w-50'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
