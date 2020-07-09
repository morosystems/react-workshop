import {Selector} from 'react-redux';
import {IState} from "./types";

/**
 *  Allows to connect game store to customization store. Otherwise returns identity
 */
export const getGameModel: Selector<IState, IState> = (state) => state;
