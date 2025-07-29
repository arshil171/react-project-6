import './itemDetail.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // id is a string

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/items?_id=${id}`);
        if (res.data.length === 0) throw new Error("Not found");
        setItem(res.data[0]);
        setLoading(false);
      } catch (err) {
        setError('Item not found or API error');
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div>Loading item details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="item-details">
      <h1>{item.title}</h1>
      <img src={item.bgImg} alt={item.title} width="200" />
      <p>{item.description}</p>
      <p>Price: ₹{item.price}</p>
    </div>
  );
};

export default ItemDetails;
