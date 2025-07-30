import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
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

  const handleAddToBag = () => {
    console.log(itemAdded);
  };

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
    <div className="w-[100%] h-[100vh] flex justify-center items-center relative top-[65px]">
      <div className="p-8 w-[90%] h-[80vh] rounded-[15px] bg-gray-50  ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Previews */}
          <div className="w-[200px] h-[585px] flex flex-col justify-center items-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[150px]  h-28 bg-gray-200 rounded-md"></div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex relative right-[200px] justify-center items-center">
            <img src={item.bgImg} alt={item.title} className="w-full rounded-md shadow-md" />
          </div>

          {/* Info Section */}
          <div className="w-[600px] flex flex-col justify-center  relative right-[200px] bg-black">
            <h2 className="text-4xl absolute top-[15px] bg-black font-bold">{item.title}</h2>

            <div className="text-lg space-y-2 absolute top-[70px]">
              <p className="text-gray-500 ">Price :- ${item.price}</p>
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
              <h4 className="text-lg font-semibold mb-1">Details</h4>
              <p className="text-gray-700">{item.description}</p>
            </div>

            <div className="absolute top-[250px]">
              <h4 className="text-lg font-semibold mb-2">Size</h4>
              <div className="flex gap-3  absolute ">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeChange(size.id)}
                    className={`px-4 relative top-[10px] w-[60px] h-[60px] py-2 rounded-full border ${size.active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-400"
                      }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute bottom-[150px]" >
              <h4 className="text-lg font-semibold mb-2">Quantity</h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={decQty}
                  className="bg-gray-300 w-[30px] h-[30px] hover:bg-gray-400 text-lg px-3 py-1 rounded"
                >
                  −
                </button>
                <span className="text-xl text-gray-400">{qty}</span>
                <button
                  onClick={incQty}
                  className="bg-gray-300 w-[30px] h-[30px] hover:bg-gray-400 text-lg px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToBag}
              className="mt-4 absolute bottom-[70px] w-[200px] h-[40px] px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
