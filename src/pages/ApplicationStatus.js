import React, { useState, useEffect } from 'react';
import { fetchContactLogs, fetchContactDetails, sendEmail } from '../services/api';

const ApplicationStatus = () => {
  const [contactLogs, setContactLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [replyDetails, setReplyDetails] = useState({
    contactId: null,
    message: '',
    email: '',
    description: '',
  });
  const [showReplyBox, setShowReplyBox] = useState(false);

  // Fetch all contact logs
  const fetchAllContactLogs = async () => {
    try {
      const response = await fetchContactLogs();
      const logs = response.data;

      const sortedLogs = logs.sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.timestamp) - new Date(b.timestamp)
          : new Date(b.timestamp) - new Date(a.timestamp)
      );

      setContactLogs(sortedLogs);
      filterLogs(sortedLogs, filter);
    } catch (error) {
      console.error('Error fetching contact logs:', error);
    }
  };

  const filterLogs = (logs, filterOption) => {
    const filtered =
      filterOption === 'pending'
        ? logs.filter((log) => log.action === 'Pending')
        : filterOption === 'resolved'
        ? logs.filter((log) => log.action === 'Resolved')
        : logs;

    setFilteredLogs(filtered);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterLogs(contactLogs, selectedFilter);
  };

  const handleReply = async (contactId) => {
    try {
      const response = await fetchContactDetails(contactId);
      const { email, description } = response.data;
      setReplyDetails({
        contactId,
        message: '',
        email,
        description,
      });
      setShowReplyBox(true);
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };

  const handleSendReply = async () => {
    const { contactId, message } = replyDetails;
    try {
      await sendEmail(contactId, message);
      setShowReplyBox(false);
      fetchAllContactLogs();
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    fetchAllContactLogs();
  }, [sortOrder]);

  return (
    <div className="container">
      <h1>Application Status</h1>
      <div className="filter-container">
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All Applications</option>
          <option value="pending">Pending Applications</option>
          <option value="resolved">Resolved Applications</option>
        </select>
        <button className="sort" onClick={toggleSortOrder}>
          Sort by Time: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className="summary">
        <strong>Total Applications:</strong> {filteredLogs.length} (of {contactLogs.length})
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr key={log.id}>
              <td>{`${log.first_name} ${log.last_name}`}</td>
              <td>{log.description}</td>
              <td
                style={{
                  color: log.action === 'Pending' ? 'red' : 'inherit',
                  fontWeight: log.action === 'Pending' ? 'bold' : 'normal',
                }}
              >
                {log.action}
              </td>
              <td>
                {log.action === 'Pending' && (
                  <button
                    className="reply"
                    onClick={() => handleReply(log.contact_id)}
                  >
                    Reply
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showReplyBox && (
        <div className="reply-box">
          <h2>Reply to Query</h2>
          <p>
            <strong>Email:</strong> {replyDetails.email}
          </p>
          <p>
            <strong>Query:</strong> {replyDetails.description}
          </p>
          <textarea
            value={replyDetails.message}
            onChange={(e) => setReplyDetails({ ...replyDetails, message: e.target.value })}
            placeholder="Write your reply here..."
          />
          <button className="reply" onClick={handleSendReply}>
            Send Reply
          </button>
          <button className="cancel" onClick={() => setShowReplyBox(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
