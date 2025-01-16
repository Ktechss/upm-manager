import React from 'react';

const ContactTable = ({ contacts }) => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{`${contact.first_name} ${contact.last_name}`}</td>
              <td>{contact.email}</td>
              <td>{contact.region}</td>
              <td>{contact.category}</td>
              <td>{contact.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
