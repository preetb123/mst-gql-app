import { Instance, types } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";
import { localStorageMixin } from "mst-gql";
import { BookModelType, BookModel } from "./BookModel";
import { selectFromBook } from "./BookModel.base";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  filter: types.optional(types.string, ""),
  addedBooks: types.array(types.string),
  filteredBooks: types.optional(
    types.array(types.reference(BookModel as any)),
    []
  )
})
  .views(self => ({
    get addBooksCount(): number {
      return self.addedBooks.length;
    },
    bookInfo(id: string) {
      return Array.from(self.books.values()).filter(book => book.id === id)[0];
    },
    getFilteredBooks() {
      if (self.filter.length === 0) {
        return Array.from(self.books.values());
      }
      return Array.from(self.books.values()).filter(book => {
        if (
          book !== null &&
          book !== undefined &&
          book.author !== null &&
          book.author !== undefined
        ) {
          return book.author.includes(self.filter);
        }
      });
    }
  }))
  .actions(self => ({
    addFilter(str: string) {
      self.filter = str;
      console.log("addFilter: ", str);
    },
    // This is an auto-generated example action.
    loadBooks() {
      const query = self.queryBooks(
        {},
        selectFromBook().author.title.toString()
      );
      query.then(data => {
        self.filteredBooks.push(...data.books);
      });
      return query;
    },
    addBook(bookId: string) {
      self.addedBooks.push(bookId);
    },
    removeBook(bookId: string) {
      self.addedBooks.splice(self.addedBooks.indexOf(bookId), 1);
    },
    shuffleBooks() {},
    log() {
      console.log(JSON.stringify(self));
    }
  }))
  .extend(
    localStorageMixin({
      throttle: 1000,
      storageKey: "appFluff"
    })
  );
