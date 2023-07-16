export const fetchMostExpensiveProducts = async () => {
    try {
      const response = await fetch('/products/most_expensive');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching most expensive products:', error);
    }
  };
