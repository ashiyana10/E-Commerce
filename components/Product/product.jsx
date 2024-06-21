import { useEffect, useState } from "react";
import {
  addCart,
  increaseProduct,
  decreaseProduct,
} from "../../Redux-toolkit/Reducer";
import store from "../../Redux-toolkit/Store";
import { useSelector } from "react-redux";

export function ProductModule() {
  // store product details
  const productData = store.getState().persistReducers.productSlice.productData;

  // set selected image for visibility and shadow
  const [selectedProductImage, setSelectedProductImage] = useState(
    productData.color["green"].images[0]
  );

  // set selected color for respectively image
  const [selectedColor, setSelectedColor] = useState("green");

  useSelector((state) => state.persistReducers.productSlice);

  /**
   * set the main image based on color selection
   */
  useEffect(() => {
    setSelectedProductImage(productData.color[selectedColor].images[0]);
  }, [selectedColor]);

  /**
   * set the add cart details when store value changed
   */
  useEffect(() => {
    addCartVisible();
  }, [store]);

  /**
   * check item is added in cart or not
   * @returns boolean value
   */
  const addCartVisible = () => {
    return store
      .getState()
      .persistReducers.productSlice.cartData.findIndex(
        (item) => item.id === productData.id && item.color === selectedColor
      );
  };

  return (
    <section className="mt-3">
      <div className="d-flex flex-column flex-sm-row">
        {/* display product images section */}
        <div className="d-flex">
          <div className="d-flex flex-column">
            {productData.color[selectedColor].images.map((item) => (
              <img
                key={item}
                src={item}
                role="button"
                className={` mb-3 product-img ${
                  selectedProductImage === item
                    ? "border border-2 border-primary rounded-3"
                    : ""
                }`}
                onMouseEnter={() => setSelectedProductImage(item)}
              />
            ))}
          </div>
          <img
            src={selectedProductImage}
            alt="Product Image"
            className="product-main-img ms-3 rounded-3"
          />
        </div>
        {/* display product details section */}
        <div className="w-100">
          <div className="mx-5">
            <p className="font-33px fw-bold mb-0">{productData.name}</p>
            {/* rating and review section */}
            <div className="star-rating">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (star) => {
                  let starClass = "star white";
                  if (star <= Math.floor(productData.averageRating)) {
                    starClass = "star yellow";
                  } else if (
                    star === Math.ceil(productData.averageRating) &&
                    productData.averageRating % 1 !== 0
                  ) {
                    starClass = "star yellow half";
                  }
                  return (
                    <span key={star} className={starClass}>
                      &#9733;
                      {starClass.includes("half") && (
                        <span className="half-star">&#9733;</span>
                      )}
                    </span>
                  );
                }
              )}
              <span className="ms-2 fw-bold">{productData.reviews.length}</span>
            </div>
            <p className="font-30px font-purple fw-bold mb-0">
              ${productData.price}
            </p>

            {/* colors section */}
            <p className="fw-bolder mb-1 mt-3">Colors</p>
            <div className="d-flex">
              <div
                role="button"
                onClick={() => setSelectedColor("green")}
                className={`color-box bg-light-green rounded-2 ${
                  selectedColor === "green"
                    ? "border border-2 border-primary rounded-3"
                    : ""
                }`}
              ></div>
              <div
                role="button"
                className={`color-box bg-light-purple rounded-2 ms-2 ${
                  selectedColor === "pink"
                    ? "border border-2 border-primary rounded-3"
                    : ""
                }`}
                onClick={() => setSelectedColor("pink")}
              ></div>
            </div>
            <div className="d-flex mt-4">
              {/* Add To Cart section is visible when user not added in cart */}
              {addCartVisible() < 0 && (
                <button
                  type="button"
                  className="form-control font-purple bg-light-purple  py-2 fw-bold"
                  onClick={() => {
                    const data = {
                      color: selectedColor,
                      id: productData.id,
                    };
                    store.dispatch(addCart(data));
                  }}
                >
                  Add To Cart
                </button>
              )}
              {/* number of items in  Cart section is visible when user added in cart */}

              {addCartVisible() >= 0 && (
                <div className="d-flex rounded-3 bg-light-purple p-1">
                  <button
                    type="button"
                    className="form-control font-purple bg-light-purple border-0 rounded-0 py-2 fw-bold"
                    onClick={() => {
                      const data = {
                        color: selectedColor,
                        id: productData.id,
                      };
                      store.dispatch(decreaseProduct(data));
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="form-control font-purple bg-light-purple rounded-0 border-dark  py-2 fw-bold"
                  >
                    {
                      store
                        .getState()
                        .persistReducers.productSlice.cartData.filter(
                          (item) =>
                            item.id === productData.id &&
                            item.color === selectedColor
                        )[0].quantity
                    }
                  </button>
                  <button
                    type="button"
                    className="form-control font-purple bg-light-purple border-0 rounded-0 py-2 fw-bold"
                    onClick={() => {
                      const data = {
                        color: selectedColor,
                        id: productData.id,
                      };
                      store.dispatch(increaseProduct(data));
                    }}
                  >
                    +
                  </button>
                </div>
              )}
              <button
                type="button"
                className="bg-white rounded-2 border-purple ms-3 width-20-per"
              >
                <img src="./Images/like.svg" />
              </button>
            </div>
            <button
              type="button"
              className="form-control text-white bg-purple py-2 fw-bold mt-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* other details section like description, etc.. */}
      <div className=" mt-4">
        <p className="font-30px mb-1">Description</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-7">
            Add a contemporary design and a pop of colour to a cozy seating area
            or your living room with this chaise-inspired loveseat. We love all
            the mid-century details from the low-profile back and round arm to
            the sleek, black-finished tapered legs. The compact frame is made
            from engineered wood, and it's wrapped in polyester fabric in a
            solid colour of your choice. Inside, this piece is filled with foam
            and pocket springs to support you while you relax with a good book.
            A yellow toss pillow with a button tuft in the middle gives it an
            extra layer of colour and texture. But the best part? This love seat
            comes with a built-in wooden side table for drinks and snacks. The
            cushion covers are not removable.
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5">
            <div className="mx-5">
              <p className="fw-bold ">What's Included?</p>
              <ul>
                <li>Toss Pillow</li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}
