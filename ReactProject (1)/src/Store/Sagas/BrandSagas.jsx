import { takeEvery, put } from "redux-saga/effects"
import { ADD_BRAND, ADD_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/BrandServices"

function* addBrand(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_BRAND_RED, payload: response.data })
}

function* getBrand() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_BRAND_RED, payload: response.data })
}

function* updateBrand(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}

function* deleteBrand(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}

export default function* BrandSagas() {                  //watcher
    yield takeEvery(ADD_BRAND, addBrand)
    yield takeEvery(GET_BRAND, getBrand)
    yield takeEvery(UPDATE_BRAND, updateBrand)
    yield takeEvery(DELETE_BRAND, deleteBrand)
}