import { takeEvery, put } from "redux-saga/effects"
import { ADD_CONTACT_US, ADD_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/ContactUsServices"

function* addContact(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CONTACT_US_RED, payload:response.data })
}

function* getContact() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_CONTACT_US_RED, payload:response.data })
}

function* updateContact(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })
}

function* deleteContact(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}

export default function* ContactUsSagas() {                  //watcher
    yield takeEvery(ADD_CONTACT_US, addContact)
    yield takeEvery(GET_CONTACT_US, getContact)
    yield takeEvery(UPDATE_CONTACT_US, updateContact)
    yield takeEvery(DELETE_CONTACT_US, deleteContact)
}