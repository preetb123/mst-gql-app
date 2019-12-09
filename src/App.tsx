import React from "react";
import { observer } from "mobx-react";
import { useQuery } from "./models/reactUtils";
import { selectFromBook } from "./models";

export const App = observer(() => {
  const { store, error, loading, data } = useQuery(store =>
    store.queryBooks({}, selectFromBook().id.author.title.toString())
  );
  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  if (data !== undefined) {
    console.log(data);
  }
  const filteredBooks = store.getFilteredBooks();
  console.log("filteredBooks: ", filteredBooks.length);
  return (
    <div style={{ margin: 16 }}>
      <div>{`Added books count: ${store.addBooksCount}`}</div>
      <button style={{ marginLeft: 16 }} onClick={() => {}}>
        Shuffle books
      </button>
      <select
        value={store.sortBy}
        onChange={e => {
          store.changeSortOrder(e.target.value);
        }}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="id">BookID</option>
      </select>
      <label>
        Contains a:
        <input
          name="containsa"
          type="checkbox"
          checked={store.filters.includes("containsa")}
          onChange={event =>
            store.addOrRemoveFilter(event.target.checked, "containsa")
          }
        />
      </label>
      <label>
        Contains e:
        <input
          name="containse"
          type="checkbox"
          checked={store.filters.includes("containse")}
          onChange={event =>
            store.addOrRemoveFilter(event.target.checked, "containse")
          }
        />
      </label>
      <input
        style={{ marginLeft: 16 }}
        onChange={e => store.addSearchString(e.target.value)}
        name="Search"
        placeholder="Search title"
      ></input>
      {data !== undefined &&
        filteredBooks.map((item, index) => (
          <ul key={index}>
            <div>{`Title: ${item.title}, Author: ${item.author}`}</div>{" "}
            {!item.isAdded ? (
              <button
                onClick={() => {
                  store.addBook(item.id);
                }}
              >
                Add
              </button>
            ) : (
              <button onClick={() => store.removeBook(item.id)}>Remove</button>
            )}
            <button onClick={() => console.log(store.bookInfo(item.id).author)}>
              Book info
            </button>
          </ul>
        ))}
    </div>
  );
});
