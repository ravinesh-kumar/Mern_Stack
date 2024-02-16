import React, { useEffect, useState } from "react";

import Sidebar from "../Sidebar";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../../Store/ActionCreators/ProductActionCreators";

import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";

import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";

import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";

import formValidation from "../../CustomValidation/formValidation";

export default function CreateProduct() {
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field Must Required",
    color: "Color Field Must Required",
    size: "Size Field Must Required",
    baseprice: "Base Price Field Must Required",
    discount: "Discount Field Must Required",
    pic1: "Pic1 Field Must Required",
  });

  let [show, setShow] = useState(false);

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    finalprice: "",
    stock: "In Stock",
    description: "This is a Sample Product",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
  });

  let [maincategory, setMaincategory] = useState([]);

  let [subcategory, setSubcategory] = useState([]);

  let [brand, setBrand] = useState([]);

  let navigate = useNavigate();

  let dispatch = useDispatch();

  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );

  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);

  let BrandStateData = useSelector((state) => state.BrandStateData);

  function getInputData(e) {
    let { name, value } = e.target;

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidation(e),
      };
    });

    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function getInputFile(e) {
    let { name, files } = e.target;

    if (name === "pic1") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: "",
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: files[0],
      };
    });
  }
  async function postData(e) {
    e.preventDefault();

    let error = Object.keys(errorMessage).find(
      (x) => errorMessage[x] && errorMessage[x].length !== 0
    );

    if (!error) {
      let fp = Math.round(
        data.baseprice - (data.baseprice * data.discount) / 100
      );

      var item = new FormData();
      item.append("name", data.name);
      item.append("maincategory", data.maincategory || maincategory[0].name);
      item.append("subcategory", data.subcategory || subcategory[0].name);
      item.append("brand", data.brand || brand[0].name);
      item.append("color", data.color);
      item.append("size", data.size);
      item.append("baseprice", parseInt(data.baseprice));
      item.append("discount", parseInt(data.discount));
      item.append("finalprice", fp);
      item.append("stock", data.stock);
      item.append("description", data.description);
      item.append("pic1", data.pic1);
      item.append("pic2", data.pic2);
      item.append("pic3", data.pic3);
      item.append("pic4", data.pic4);

      dispatch(addProduct(item));

      navigate("/admin/product");
    } else {
      setShow(true);
    }
  }
  function getAPIData() {
    dispatch(getMaincategory());

    dispatch(getSubcategory());

    dispatch(getBrand());

    if (MaincategoryStateData.length) setMaincategory(MaincategoryStateData);

    if (SubcategoryStateData.length) setSubcategory(SubcategoryStateData);

    if (BrandStateData.length) setBrand(BrandStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [
    MaincategoryStateData.length,
    SubcategoryStateData.length,
    BrandStateData.length,
  ]);

  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-light p-2 text-center">Product</h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Name"
                />
                {show ? <p className="text-danger">{errorMessage.name}</p> : ""}
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label>Maincategory</label>
                  <select
                    name="maincategory"
                    onChange={getInputData}
                    className="form-control"
                  >
                    {maincategory.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Subcategory</label>
                  <select
                    name="subcategory"
                    onChange={getInputData}
                    className="form-control"
                  >
                    {subcategory.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Brand</label>
                  <select
                    name="brand"
                    onChange={getInputData}
                    className="form-control"
                  >
                    {brand.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Stock</label>
                  <select
                    name="stock"
                    onChange={getInputData}
                    className="form-control"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out Of Stock">Out Of Stock</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    onChange={getInputData}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger">{errorMessage.color}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Size</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    onChange={getInputData}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger">{errorMessage.size}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Base Price</label>
                  <input
                    type="number"
                    name="baseprice"
                    placeholder="Base Price"
                    onChange={getInputData}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger">{errorMessage.baseprice}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Discount</label>
                  <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    min={0}
                    onChange={getInputData}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger">{errorMessage.discount}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  className="form-control"
                  placeholder="Description..."
                  onChange={getInputData}
                  value={data.description}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic1</label>
                  <input
                    type="file"
                    name="pic1"
                    onChange={getInputFile}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger">{errorMessage.pic1}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic2</label>
                  <input
                    type="file"
                    name="pic2"
                    onChange={getInputFile}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic3</label>
                  <input
                    type="file"
                    name="pic3"
                    onChange={getInputFile}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic4</label>
                  <input
                    type="file"
                    name="pic4"
                    onChange={getInputFile}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-success w-50"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary w-50">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
