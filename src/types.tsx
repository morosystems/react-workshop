import { Saga } from "redux-saga";
import { Reducer } from "redux";
import { ComponentType } from "react";

import { Ii18nState } from "i18n/types";
import { IStorageState } from "storage/types";
import { IWorkersState } from "workers/types";
import {IConfigState} from 'config/types';
export enum Locale {
  EN = "en",
  CZ = "cs"
}

export enum ResourceType {
  wood,
  food,
  worker
}

export interface ISwitchOption {
  id: number | string;
  name: string;
}

export interface IGameRules {
  workerGoal: number;
  houseCapacity: number;
  workerArrivalSeconds: number;
  sawProductionSeconds: number;
  sawProductionPerWorkerRatio: number;
  fieldProductionSeconds: number;
  fieldProductionPerWorkerRatio: number;
  employedWorkerStarvationSeconds: number;
  unEmployedWorkerStarvationSeconds: number;
  houseWoodCost: number;
  startingWorkers: number;
  startingWorkerCapacity: number;
}

export interface IState {
  readonly config: IConfigState;
  readonly workers: IWorkersState;
  readonly i18n: Ii18nState;
  readonly storage: IStorageState;
}

/**
 * Definice modulu aplikace. Společná pro core moduly i business moduly.
 *
 * NAME má generický typ založený na stringu, který umožní zadat jako typ konkrétní hodnotu stringu.
 * Díky tomu se dá NAME z konkrétního modulu použít jako konstanta, například při tvorbě stavu z reducerů.
 */
export interface ApplicationModule<N extends string, C = {}> {
  /**
   * Jméno modulu. Slouží pro identifikaci modulu a musí být unikátní.
   */
  readonly NAME: N;
  /**
   * Pokud modul vyžaduje asynchronní procesy, je pomocí ságy.
   */
  readonly saga?: Saga;
  /**
   * Pokud modul poskytuje uživatelské rozhraní, poskytne svoji kořenovou komponentu pomocí tohoto atributu.
   */
  readonly Container?: ComponentType<C>;
}

/**
 * Modul aplikace, který pracuje se stavem a tudíž definuje reducer.
 */
export interface ApplicationStatefulModule<
  N extends string,
  R extends Reducer = Reducer,
  C = {}
> extends ApplicationModule<N, C> {
  /**
   * Pokud pro svou funkci modul vyžaduje stav v reduxu, definuje ho pomocí reduceru.
   */
  readonly reducer: R;
}

export type NoneOwnProps = {};

/**
 * Základ typu pro MutableTypedObject a TypedObject. Nemůže být přiřazeno přímo do exportovaného MutableTypedObject a ten pak využít
 * v TypedObject kvůli problémům s generovanými typy, viz task 27385.
 */
type TypedObjectBase<T> = { [key: string]: T };

/**
 * Generický typ pro objekt.
 */
export type TypedObject<T> = Readonly<TypedObjectBase<T>>;
