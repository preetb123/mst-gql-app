import { Instance } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";
import { localStorageMixin } from "mst-gql";
import { BookModelType } from "./BookModel";

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.views(self => ({}))
  .actions(self => ({
    // This is an auto-generated example action.
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
