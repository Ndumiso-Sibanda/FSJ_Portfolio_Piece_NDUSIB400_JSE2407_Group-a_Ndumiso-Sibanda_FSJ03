const SortSelect = ({ sortOrder, onSortChange }) => {
    const handleSortChange = (e) => {
      onSortChange(e.target.value); 
    };
  
    return (
      <select value={sortOrder} onChange={handleSortChange} className="mb-4 p-2 border border-gray-300 rounded">
        <option value="">Sort By</option> 
        <option value="price-asc">Price (Low to High)</option> 
        <option value="price-desc">Price (High to Low)</option> 
      </select>
    );
  };
  
  export default SortSelect;
  