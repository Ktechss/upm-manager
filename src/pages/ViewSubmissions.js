import React, { useState, useEffect } from 'react';
import { fetchContacts } from '../services/api';
import Filter from '../components/Filter';
import ContactTable from '../components/ContactTable';
import * as XLSX from 'xlsx';

const ViewSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleFilter = async (filters) => {
    const response = await fetchContacts(filters);
    setFilteredContacts(response.data);
  };

  const handleDownloadExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        filteredContacts.map((contact) => ({
          Name: `${contact.first_name} ${contact.last_name}`.trim() || 'N/A',
          Email: contact.email || 'N/A',
          Region: contact.region || 'N/A',
          Category: contact.category || 'N/A',
          Query: contact.description || 'N/A',
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
      XLSX.writeFile(workbook, 'Submissions.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
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
      <div className="download-container">
        <button
          className="download-button"
          onClick={handleDownloadExcel}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px 0',
          }}
        >
          Download Excel
        </button>
      </div>
      <div className="summary">
        <strong>Total Submissions:</strong> {filteredContacts.length} (of {contacts.length})
      </div>
      <ContactTable contacts={filteredContacts} />
    </div>
  );
};

export default ViewSubmissions;
