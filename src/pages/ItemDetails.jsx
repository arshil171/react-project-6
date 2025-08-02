import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

const ItemDetails = () => {
  const { bag, setBag } = useContext(AppContext)
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
   
  const sizeList = [
    { id: 1, name: "XS", active: false },
    { id: 2, name: "S", active: false },
    { id: 3, name: "M", active: true },
    { id: 4, name: "L", active: false },
    { id: 5, name: "XL", active: false },
  ];
  
  const [sizes, setSizes] = useState(sizeList);
  const [qty, setQty] = useState(1);
  const [itemAdded, setItemAdded] = useState(null);


     
  const handleSizeChange = (id) => {
    const updatedSizes = sizes.map((size) => ({
      ...size,
      active: size.id === id,
    }));
    setSizes(updatedSizes);

    const selectedSize = updatedSizes.find((s) => s.active);
    setItemAdded({ ...item, qty, size: selectedSize.name });
  };

  const incQty = () => {
    const newQty = qty >= 99 ? 99 : qty + 1;
    setQty(newQty);
    if (item) setItemAdded({ ...item, qty: newQty });
  };

  const decQty = () => {
    const newQty = qty <= 1 ? 1 : qty - 1;
    setQty(newQty);
    if (item) setItemAdded({ ...item, qty: newQty });
  };

 
 const handleAddToBag = item =>{
  console.log(item)
   if(bag.includes(item)) return;
   setBag([...bag , item])
   alert("product successfully added in the cart")
 }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/items?_id=${id}`);
        if (res.data.length === 0) throw new Error("Not found");
        setItem(res.data[0]);
        setItemAdded({ ...res.data[0], qty: 1, size: "M" });
        setLoading(false);
      } catch (err) {
        setError("Item not found or API error");
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center text-lg text-gray-500">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center relative top-[45px]">
      <div className="p-8 w-[90%] h-[80vh] rounded-[15px] bg-gray-50  ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Previews */}
          <div className="w-[200px] h-[585px] flex flex-col justify-center items-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[150px]  h-28 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex relative right-[200px]  justify-center items-center">
            <img src={item.bgImg} alt={item.title} className="w-full h-[550px] rounded-md shadow-md" />
          </div>

          {/* Info Section */}
          <div className="w-[600px] flex flex-col justify-center  relative right-[200px]">
            <h2 className="text-4xl absolute top-[15px]  desc font-bold">{item.title}</h2>

            <div className="text-lg space-y-2 absolute top-[70px]">
              <p className="desc "><span className="font-semibold desc inline">Price</span> :- ${item.price}</p>
              {/* {item.discount > 0 && (
                <>
                  <p className=" font-semibold">
                    {item.discount * 100}% OFF
                  </p>
                  <p className="text-xl font-bold">
                    Now: ${(item.price * (1 - item.discount)).toFixed(2)}
                  </p>
                </>
              )} */}
            </div>

            <div className="absolute top-[110px]">
              <h4 className=" desc text-lg font-semibold mb-1">Details</h4>
              <p className="desc">{item.description}</p>
            </div>

            <div className="absolute top-[250px]">
              <h4 className="text-lg desc font-semibold mb-2">Size</h4>
              <div className="flex gap-3  absolute ">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeChange(size.id)}
                    className={`px-4 relative top-[10px] w-[60px] h-[60px] py-2 rounded-full border ${size.active
                      ? "bg-white text-black  border-black"
                      : "bg-black text-white border-white"
                      }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute bottom-[150px]" >
              <h4 className="text-lg desc font-semibold mb-2">Quantity</h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={decQty}
                  className="bg-black text-white w-[30px] h-[30px] hover:bg-gray-400 text-lg px-3 py-1 rounded"
                >
                  −
                </button>
                <span className="text-xl desc text-gray-400">{qty}</span>
                <button
                  onClick={incQty}
                  className="bg-black w-[30px] text-white h-[30px] hover:bg-gray-400 text-lg px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() =>  handleAddToBag(itemAdded) }
              className="mt-4 absolute bottom-[70px] w-[200px] h-[40px] px-6 py-2 bg-black text-white hover:text-black hover:border rounded-md hover:bg-white transition"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
