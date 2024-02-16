import { takeEvery, put } from "redux-saga/effects"
import { ADD_CHECKOUT, ADD_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CheckoutServices"

function* addCheckout(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CHECKOUT_RED, payload: response.data })
}

function* getCheckout() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_CHECKOUT_RED, payload: response.data })
}

function* updateCheckout(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}

function* deleteCheckout(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* CheckoutSagas() {                  //watcher
    yield takeEvery(ADD_CHECKOUT, addCheckout)
    yield takeEvery(GET_CHECKOUT, getCheckout)
    yield takeEvery(UPDATE_CHECKOUT, updateCheckout)
    yield takeEvery(DELETE_CHECKOUT, deleteCheckout)
}