import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../services/api';
import Filter from '../components/Filter';
import ContactTable from '../components/ContactTable';

const ViewSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleFilter = async (filters) => {
    const response = await fetchContacts(filters);
    setFilteredContacts(response.data);
  };

  useEffect(() => {
    const fetchAllContacts = async () => {
      const response = await fetchContacts({});
      setContacts(response.data);
      setFilteredContacts(response.data);
    };
    fetchAllContacts();
  }, []);

  return (
    <div className="container">
      <h1>View Submissions</h1>
      
      <Filter onFilter={handleFilter} />
      <div className="summary">
        <strong>Total Submissions:</strong> {filteredContacts.length} (of {contacts.length})
      </div>
      <ContactTable contacts={filteredContacts} />
    </div>
  );
};

export default ViewSubmissions;
