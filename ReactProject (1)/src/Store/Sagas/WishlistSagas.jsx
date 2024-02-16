import { takeEvery, put } from "redux-saga/effects"
import { ADD_WISHLIST, ADD_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED } from "../Constants"
import { addRecord, deleteRecord, getRecord } from "./Services/WishlistServices"

function* addWishlist(action) {                                     //executer
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_WISHLIST_RED, payload:response.data })
}

function* getWishlist() {                                               //executer
    let response = yield getRecord()
    yield put({ type: GET_WISHLIST_RED, payload:response.data })
}


function* deleteWishlist(action) {                                  //executer
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* WishlistSagas() {                  //watcher
    yield takeEvery(ADD_WISHLIST, addWishlist)
    yield takeEvery(GET_WISHLIST, getWishlist)
    yield takeEvery(DELETE_WISHLIST, deleteWishlist)
}