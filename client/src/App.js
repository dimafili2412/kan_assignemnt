import './App.css';
import React, {useEffect, useState} from 'react';
import { fetchMostExpensiveProducts } from './api';

function App() {
  const [products, setProducts] = useState([])
  const [deptManagers, setDeptManagers] = useState([])
  const [suppliers, setSuppliers] = useState([])

  //api calls
  useEffect(() => {
    fetchMostExpensiveProducts();
  }, []);

  return (
    <div className="App">
      <h1>Warehouse</h1>
    </div>
  );
}

export default App;
