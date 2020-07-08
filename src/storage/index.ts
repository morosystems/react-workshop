import { NAME } from "./constants";
import { StorageContainer as Container } from "./Container";
import { reducer } from "./reducer";
import { saga } from "./saga";
import {
  getFoodAmount,
  getWoodAmount,
  getWorkerCapacity,
  hasStorageAnyFood
} from "./selectors";
import {
  actionBuildHouseCreator,
  actionRemoveFoodCreator,
  actionAddWoodCreator,
  actionAddFoodCreator
} from "./actions";

export const storage = {
  NAME,
  Container,
  reducer,
  saga,
  getFoodAmount,
  getWoodAmount,
  getWorkerCapacity,
  hasStorageAnyFood,
  actionBuildHouseCreator,
  actionRemoveFoodCreator,
  actionAddWoodCreator,
  actionAddFoodCreator
};
