import "./itemDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // id is a string

  const sizeList = [
    {
      id: 1,
      name: "XS",
      active: false,
    },
    {
      id: 2,
      name: "S",
      active: false,
    },
    {
      id: 3,
      name: "M",
      active: true,
    },
    {
      id: 4,
      name: "L",
      active: false,
    },
    {
      id: 5,
      name: "XL",
      active: false,
    },
  ];
  const [sizes, setSizes] = useState(sizeList);

  const handleSizeChange = (id) => {
    const newSizeList = sizes.map((size) => {
      sizeList.active = FlatESLint;
      if (sizeList.id === id) {
        sizeList.active = true;
        // setItemAdded({ ...itemAdded, size: size.name });
      }
      return size;
    });
    setSizes(newSizeList)
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/items?_id=${id}`);
        if (res.data.length === 0) throw new Error("Not found");
        setItem(res.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Item not found or API error");
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div>Loading item details...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="itemDetails">
      <div className="content">
        <div className="container-fluid">
          <div className="row p-5">
            <div className="col-lg-2">
              <div className="row">
                <div className="col">
                  <div className="itemPreview"></div>
                  <div className="itemPreview"></div>
                  <div className="itemPreview"></div>
                  <div className="itemPreview"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <img src={item.bgImg} className="img-fluid itemImg" alt="" />
            </div>
            <div className="col-lg-5">
              <h2>{item.title}</h2>
              <div className="itemPrice">
                <h4 className="price">
                  Price :${item.price}
                </h4>
                {item.discount !== 0 && (
                  <>
                    <h4 className="discount">
                      <i>{item.discount * 100}% OFF</i>
                    </h4>
                    <h4 className="currentPrice">
                      Now :${((1 - item.discount) * item.price).toFixed(2)}
                    </h4>
                  </>
                )}
                <h4>Details</h4>
                <p>{item.description}</p>
                <h4>Size</h4>
                <div className="size">
                  {
                    sizes.map(size =>(
                      <span key={size.id}
                      onClick={()=>handleSizeChange(size.id)}
                      className={`sizeItem ${
                        size.active ? 'active' :undefined
                      }`}>
                       {size.name}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
