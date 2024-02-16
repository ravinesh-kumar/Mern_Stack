import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_RED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_RED,
  GET_PRODUCT,
  GET_PRODUCT_RED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_RED,
} from "../Constants";
import {
  addRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Services/ProductServices";

function* addProduct(action) {
  //executer
  let response = yield addRecord(action.payload);
  yield put({ type: ADD_PRODUCT_RED, payload: response.data });
}

function* getProduct() {
  //executer
  let response = yield getRecord();
  yield put({ type: GET_PRODUCT_RED, payload: response.data });
}

function* updateProduct(action) {
  //executer
  // console.log(`from product update saga id is `,action.payload.get("_id"));
  // let response = yield updateRecord(action.payload.get("_id"))
  let response = yield updateRecord(action.payload);
  // console.log(`from product update saga`,response.data);
  yield put({ type: UPDATE_PRODUCT_RED, payload: response.data });
}

function* deleteItem(action) {
  //executer
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_PRODUCT_RED, payload: action.payload });
}

export default function* ProductSagas() {
  //watcher
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(GET_PRODUCT, getProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(DELETE_PRODUCT, deleteItem);
}
