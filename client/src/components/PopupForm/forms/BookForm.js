import React from 'react';

export default function (callback) {
  return (
    <div>

      <div>Add Book</div>

      <label>
        Title:
        <input
          data-key="title"
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Author:
        <input
          data-key="author"
          type="text"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
