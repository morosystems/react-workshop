import { Action } from "redux";

/**
 * Úkol 3
 * 1.v souboru src/storage/types.ts
 *  - vytvoření interface pro sklad IStorage  bude obsahovat množství dřeva a jídla
 *  - JNemvytvoření interface IStorageState  stav našeho modulu, bude obsahovat typování skladu a kapacity provníků
 */
export interface IStorage {
}

export interface IStorageState {
}

export interface IWoodProducedAction extends Action<string> {
  readonly payload: {
    readonly amount: number;
  };
}

export interface IFoodProducedAction extends Action<string> {
  readonly payload: {
    readonly amount: number;
  };
}

export interface IRemoveFoodAction extends Action<string> {
  readonly payload: {
    readonly amount: number;
  };
}

export interface ISetWorkerCapacityAction
  extends Action<string> {
  readonly payload: {
    readonly workerCapacity: number;
  };
}

export interface IBuildHouseAction extends Action<string> {
  readonly payload: {
    readonly houseWorkerCapacity: number;
    readonly houseWoodCost: number;
  };
}
