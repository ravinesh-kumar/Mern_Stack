import { takeEvery, put } from "redux-saga/effects"
import { ADD_TESTIMONIAL, ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/TestimonialServices"

function* addTestimonial(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_TESTIMONIAL_RED, payload:response.data })
}

function* getTestimonial() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_TESTIMONIAL_RED, payload:response.data })
}

function* updateTestimonial(action) {                                      //executer
    let response = yield updateRecord(action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: response.data })
}

function* deleteTestimonial(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* TestimonialSagas() {                  //watcher
    yield takeEvery(ADD_TESTIMONIAL, addTestimonial)
    yield takeEvery(GET_TESTIMONIAL, getTestimonial)
    yield takeEvery(UPDATE_TESTIMONIAL, updateTestimonial)
    yield takeEvery(DELETE_TESTIMONIAL, deleteTestimonial)
}