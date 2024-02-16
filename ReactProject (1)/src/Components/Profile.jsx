import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  deleteWishlist,
  getWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  let [user, setUser] = useState({});
  let [wishlist, setWishlist] = useState([]);
  let [orders, setOrders] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  function deleteItem(_id) {
    dispatch(deleteWishlist({ _id: _id }));
    getAPIData();
  }
  async function getAPIData() {
    let response = await fetch("/api/user/" + localStorage.getItem("userid"), {
      method: "get",
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
    });
    response = await response.json();
    // console.log(`from profile page`, response);
    if (response.status !== 200) {
      navigate("/login");
    } else {
      setUser(response.data);
    }

    dispatch(getWishlist());
    dispatch(getCheckout());
    if (WishlistStateData.length) {
      setWishlist(
        WishlistStateData
      );
    }
    // console.log(`checkout length`, CheckoutStateData.length);
    if (CheckoutStateData.length) {

      setOrders(
        CheckoutStateData
      );
    }
  }
  useEffect(() => {
    getAPIData();
  }, [WishlistStateData.length, CheckoutStateData.length]);
  return (
    <>
      {/* <!-- Page Header Start --> */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(img/carousel-bg-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Profile
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Page Header End --> */}
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            {user.pic ? (
              <img
                src={`${user.pic}`}
                height="400px"
                width="100%"
                alt=""
              />
            ) : (
              <img src={`/img/nouser.png`} height="400px" width="100%" alt="" />
            )}
          </div>
          <div className="col-md-6">
            <table className="table table-bordered table-striped table-hover">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>UserName</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{user.address}</td>
                </tr>
                <tr>
                  <th>PIN</th>
                  <td>{user.pin}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{user.city}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{user.state}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Link
                      to="/update-profile"
                      className="btn btn-primary w-100"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h5 className="text-center bg-primary text-light p-2">
          Wishlist Section
        </h5>
        {wishlist.length ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <tbody>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Color/Size</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
                {wishlist.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a
                          href={`/${item.pic}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={`/${item.pic}`}
                            height="80px"
                            width="80px"
                            className="rounded-1"
                            alt=""
                          />
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>
                        {item.color}/{item.size}
                      </td>
                      <td>&#8377;{item.price}</td>
                      <td>
                        <Link to={`/${item.productid}`}>
                          <i className="fa fa-shopping-cart text-success"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn "
                          onClick={() => deleteItem(item._id)}
                        >
                          <i className="fa fa-trash text-primary"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-5">
            <p>No Items in Wishlist</p>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
        <h5 className="text-center bg-primary text-light p-2">
          Orders Section
        </h5>
        {orders.length ? (
          <>
            {orders.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-4">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-hover">
                        <tbody>
                          <tr>
                            <th>Order Id</th>
                            <td>{item._id}</td>
                          </tr>
                          <tr>
                            <th>Order Status</th>
                            <td>{item.orderstatus}</td>
                          </tr>
                          <tr>
                            <th>Payment Mode</th>
                            <td>{item.paymentmode}</td>
                          </tr>
                          <tr>
                            <th>Payment Status</th>
                            <td>{item.paymentstatus}</td>
                          </tr>
                          <tr>
                            <th>Subtotal</th>
                            <td>&#8377;{item.subtotal}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>&#8377;{item.shipping}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>&#8377;{item.total}</td>
                          </tr>
                          <tr>
                            <th>Date</th>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <table className="table table-bordered table-striped table-hover">
                      <tbody>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Color/Size</th>
                          <th>Price</th>
                          <th>QTY</th>
                          <th>Total</th>
                        </tr>
                        {item.products.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <a
                                  href={`/${item.pic}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <img
                                    src={`/${item.pic}`}
                                    height="80px"
                                    width="80px"
                                    className="rounded-1"
                                    alt=""
                                  />
                                </a>
                              </td>
                              <td>{item.name}</td>
                              <td>{item.brand}</td>
                              <td>
                                {item.color}/{item.size}
                              </td>
                              <td>&#8377;{item.price}</td>
                              <td>{item.qty}</td>
                              <td>&#8377;{item.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <hr style={{ border: "5px solid navy" }} />
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center p-5">
            <p>No Order History Found</p>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
