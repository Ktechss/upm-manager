import React, { useEffect, useState } from 'react';
import { fetchRegions, fetchCategories } from '../services/api';

const Filter = ({ onFilter }) => {
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ region: '', category: '' });

  useEffect(() => {
    async function loadData() {
      const [regionsData, categoriesData] = await Promise.all([
        fetchRegions(),
        fetchCategories(),
      ]);
      setRegions(regionsData.data);
      setCategories(categoriesData.data);
    }
    loadData();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    onFilter({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-container">
      <select name="region" onChange={handleFilterChange}>
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region.id} value={region.name}>
            {region.name}
          </option>
        ))}
      </select>
      <select name="category" onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
