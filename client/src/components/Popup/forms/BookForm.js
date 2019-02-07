import React from 'react';

export default function (callback, data) {

  return (
    <div>

      <label>
        Title:
        <input
          data-key="title"
          value={data.title}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Author:
        <input
          data-key="author"
          value={data.author}
          type="text"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
