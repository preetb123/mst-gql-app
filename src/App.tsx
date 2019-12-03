import React from "react";
import { observer } from "mobx-react";
import { useQuery } from "./models/reactUtils";

export const App = observer(() => {
  const { store, error, loading, data } = useQuery(store =>
    store.queryBooks({}, items => items.title.author)
  );
  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  if (data !== undefined) {
    console.log(data.books);
  }
  return (
    <div style={{ margin: 16 }}>
      <div>Added books: </div>
      {data !== undefined &&
        data.books.map((item, index) => (
          <ul key={index}>
            <div>{`Title: ${item.title}, Author: ${item.author}`}</div>{" "}
            <button>Add</button>
          </ul>
        ))}
    </div>
  );
});
