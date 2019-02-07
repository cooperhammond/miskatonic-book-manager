import React from 'react';

export default function (callback, data) {

  return (
    <div>

      <label>
        First Name:
        <input
          data-key="firstName"
          value={data.firstName}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Last Name:
        <input
          data-key="lastName"
          value={data.lastName}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Email:
        <input
          data-key="email"
          value={data.email}
          type="email"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
