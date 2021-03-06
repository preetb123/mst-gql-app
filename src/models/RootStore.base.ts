/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { BookModel, BookModelType } from "./BookModel"
import { bookModelPrimitives, BookModelSelector } from "./BookModel.base"


export type BookInfo = {
  id: string | undefined
  title: string | undefined
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  books: ObservableMap<string, BookModelType>
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Book', () => BookModel]], ['Book']))
  .props({
    books: types.optional(types.map(types.late((): any => BookModel)), {})
  })
  .actions(self => ({
    queryBooks(variables?: {  }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ books: BookModelType[]}>(`query books { books {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryFilterBooks(variables: { ids: BookInfo | undefined[] }, resultSelector: string | ((qb: BookModelSelector) => BookModelSelector) = bookModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ filterBooks: BookModelType[]}>(`query filterBooks($ids: [BookInfo]) { filterBooks(ids: $ids) {
        ${typeof resultSelector === "function" ? resultSelector(new BookModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  })))
