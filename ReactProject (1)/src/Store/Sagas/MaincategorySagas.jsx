import { takeEvery, put } from "redux-saga/effects"
import { ADD_MAINCATEGORY, ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/MaincategoryServices"

function* addMaincategory(action) {                                     //executer
let response = yield addRecord(action.payload)
    yield put({ type: ADD_MAINCATEGORY_RED, payload:response.data })
}

function* getMaincategory() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_MAINCATEGORY_RED, payload:response.data })
}

function* updateMaincategory(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}

function* deleteMaincategory(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* MaincategorySagas() {                  //watcher
    yield takeEvery(ADD_MAINCATEGORY, addMaincategory)
    yield takeEvery(GET_MAINCATEGORY, getMaincategory)
    yield takeEvery(UPDATE_MAINCATEGORY, updateMaincategory)
    yield takeEvery(DELETE_MAINCATEGORY, deleteMaincategory)
}