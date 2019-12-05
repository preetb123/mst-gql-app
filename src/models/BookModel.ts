import { Instance, types } from "mobx-state-tree";
import { BookModelBase } from "./BookModel.base";

/* The TypeScript type of an instance of BookModel */
export interface BookModelType extends Instance<typeof BookModel.Type> {}

/* A graphql query fragment builders for BookModel */
export {
  selectFromBook,
  bookModelPrimitives,
  BookModelSelector
} from "./BookModel.base";

/**
 * BookModel
 */
export const BookModel = BookModelBase.props({})
  .views(self => ({
    get isAdded(): boolean {
      return self.store.addedBooks.includes(self.id);
    }
  }))
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self));
    }
  }));
