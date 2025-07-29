import "./itemDetail.css";
import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
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
  const [qty , setQty] = useState(1)
  const [itemAdded  , setItemAdded] = useState({...item , qty:1, size:'M'})

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
   
 const incQty = ()=>{
  if(qty > 90){
    setQty(99)
    return
  }
  setQty(qty +1)
  // setItemAdded({...setItemAdded , qty : qty +1})
 }
  
 const decQty = ()=>{
  if(qty < 2){
    setQty(1)
    return
  }
  setQty(qty - 1)
  // setItemAdded({...itemAdded , qty :qty -1})
 }
  
 const handleAddToBag = item =>{
  console.log(item)
 }
 
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/items?_id=${id}`);
        if (res.data.length === 0) throw new Error("Not found");
        setItem(res.data[0]);
        // setItem(data[index])
        // setItemAdded({...data[index] , qty:1 ,size:'M'})
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
          <div className="row1 p-5">
            <div className="col-lg-2">
              <div className="row">
                <div className="col ">
                  <div className="itemPreview "></div>
                  <div className="itemPreview"></div>
                  <div className="itemPreview"></div>
                  <div className="itemPreview"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-img">
              <img src={item.bgImg} className="img-fluid itemImg" alt="" />
            </div>
            <div className="col-lg-5 ">
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

              </div>
              <h4>Details</h4>
              <p className="desc">{item.description}</p>
              <h4>Size</h4>
              <div className="size">
                {
                  sizes.map(size => (
                    <span key={size.id}
                      onClick={() => handleSizeChange(size.id)}
                      className={`sizeItem ${size.active ? 'active' : undefined
                        }`}>
                      {size.name}
                    </span>
                  ))
                }
              </div>
              <h4>Quantity</h4>
              <div className="quantity">
                <a href="#" className="qtyButton" onClick={decQty}>
                     <i>-</i>
                </a>
                <a href="#"className="qtyButton"onClick={incQty} >
                  <i>+</i>
                </a>
              </div>
              <a href="#" className="addButton me-3" onClick={()=>{handleAddToBag(itemAdded)}}>
                Add to Bag
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
