import React from 'react';

export default function (callback, focusItem) {

  if (!focusItem) {
    focusItem = {
      title: "",
      author: ""
    }
  }

  return (
    <div>

      <div>Add Book</div>

      <label>
        Title:
        <input
          data-key="title"
          placeholder={focusItem.title}
          type="text"
          required={true}
          onChange={callback} />
      </label>

      <br/>
      <label>
        Author:
        <input
          data-key="author"
          placeholder={focusItem.author}
          type="text"
          required={true}
          onChange={callback} />
      </label>

    </div>
  )
}
