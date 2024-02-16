import { takeEvery, put } from "redux-saga/effects"
import { ADD_SUBCATEGORY, ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/SubcategoryServices"

function* addSubcategory(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_SUBCATEGORY_RED, payload:response.data})
}

function* getSubcategory() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_SUBCATEGORY_RED, payload:response.data})
}

function* updateSubcategory(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}

function* deleteSubcategory(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* SubcategorySagas() {                  //watcher
    yield takeEvery(ADD_SUBCATEGORY, addSubcategory)
    yield takeEvery(GET_SUBCATEGORY, getSubcategory)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSubcategory)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSubcategory)
}