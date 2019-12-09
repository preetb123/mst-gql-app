import { Instance, types } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";
import { localStorageMixin } from "mst-gql";
import { BookModelType, BookModel } from "./BookModel";
import { selectFromBook } from "./BookModel.base";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  searchString: types.optional(types.string, ""),
  sortBy: types.optional(types.string, "id"),
  filters: types.optional(types.array(types.string), []),
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
      let result: Array<BookModelType>;
      if (self.filters.length === 0) {
        result = Array.from(self.books.values());
      } else {
        result = Array.from(self.books.values());
        self.filters.forEach(filter => {
          switch (filter) {
            case "containsa":
              result = result.filter(book => book.author?.includes("a"));
              break;
            case "containse":
              result = result.filter(book => book.author?.includes("e"));
              break;
          }
          //Array.from(self.books.values()).filter(book => book.);
        });
        // result = Array.from(self.books.values()).filter(book => {
        //   return book?.author?.includes(self.searchString);
        // });
      }
      return result.sort((a, b) => {
        switch (self.sortBy) {
          case "id":
            return parseInt(a.id) > parseInt(b.id) ? -1 : 1;
          case "author":
            return (a.author ?? "").localeCompare(b.author ?? "");
          case "title":
            return (a.title ?? "").localeCompare(b.title ?? "");
          default:
            return parseInt(a.id) > parseInt(b.id) ? -1 : 1;
        }
      });
    }
  }))
  .actions(self => ({
    addSearchString(searchString: string) {
      self.searchString = searchString;
    },
    addOrRemoveFilter(checked: boolean, filter: string) {
      if (checked) {
        self.filters.push(filter);
      } else {
        let index = self.filters.indexOf(filter);
        self.filters.splice(index, 1);
      }
      console.log(
        "addOrRemoveFilter: checked: ",
        checked,
        ", filter: ",
        filter
      );
    },
    changeSortOrder(sortBy: string) {
      self.sortBy = sortBy;
      console.log("addFilter: ", sortBy);
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
