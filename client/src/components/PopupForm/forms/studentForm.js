import React from 'react';

export default function (callback) {
  return (
    <div>

      <div>Add Student</div>

      <label>
        First Name
        <input
          data-key="firstName"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Last Name
        <input
          data-key="lastName"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Email
        <input
          data-key="email"
          type="email"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
