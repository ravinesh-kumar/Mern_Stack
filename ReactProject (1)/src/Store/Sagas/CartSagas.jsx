import { takeEvery, put } from "redux-saga/effects"
import { ADD_CART, ADD_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CartServices"

function* addCart(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CART_RED, payload:response.data})
}

function* getCart() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_CART_RED, payload:response.data})
}

function* updateCart(action) {                                      //executer
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })
}

function* deleteCart(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* CartSagas() {                  //watcher
    yield takeEvery(ADD_CART, addCart)
    yield takeEvery(GET_CART, getCart)
    yield takeEvery(UPDATE_CART, updateCart)
    yield takeEvery(DELETE_CART, deleteCart)
}