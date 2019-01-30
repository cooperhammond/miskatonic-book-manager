import React from 'react';

export default function (callback, focusItem) {

  if (!focusItem) {
    focusItem = {
      firstName: "",
      lastName: "",
      email: ""
    }
  }

  return (
    <div>

      <div>Add Student</div>

      <label>
        First Name
        <input
          data-key="firstName"
          placeholder={focusItem.firstName}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Last Name
        <input
          data-key="lastName"
          placeholder={focusItem.lastName}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Email
        <input
          data-key="email"
          placeholder={focusItem.email}
          type="email"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
