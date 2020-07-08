//import i18next from "i18next";
import { reducer } from "./reducer";
import { saga } from "./saga";
import { createSetLocaleCodeAction } from "./actions";
import { getMessage, getLocaleCode } from "./selectors";
import { NAME } from "./constants";
//import { initReactI18next } from "react-i18next";

// i18next
//   .use(initReactI18next) // bind react-i18next to the instance
//   .init({
//     lng: Locale.EN,
//     resources: {
//       [Locale.EN]: {
//         translation: {
//           unemployed: "Unemployed",
//           field: "Field",
//           saw: "Saw",
//           graveyard: "Graveyard",
//           secondsToWorkersArraival: "seconds to arrival of new workers",
//           buildHouseButton: "Build house"
//         }
//       },
//       [Locale.CZ]: {
//         translation: {
//           unemployed: "Nezaměstnaný",
//           field: "Pole",
//           saw: "Pila",
//           graveyard: "Hřbitov",
//           secondsToWorkersArraival: "vteřin do příchodu nových pracovníků",
//           buildHouseButton: "Postav dům"
//         }
//       }
//     }
//   });

export const i18n = {
  NAME,
  reducer,
  saga,
  createSetLocaleCodeAction,
  getMessage,
  getLocaleCode
};
