import React, { FunctionComponent } from "react";
import {connect, MapDispatchToProps, MapStateToProps} from "react-redux";
import { OptionSwitch } from "components";
import {ISwitchOption, IState, Locale, NoneOwnProps} from "types";
import { i18n } from "i18n";

const localizationOptions: Array<ISwitchOption> = [
  { id: Locale.EN, name: "EN" },
  { id: Locale.CZ, name: "CZ" }
];

type LocalizationOptionSwitchProps = {
  locale: Locale;
  onChangeLocale: (newLocale: Locale) => void;
};

const LocalizationOptionSwitch: FunctionComponent<
  LocalizationOptionSwitchProps
> = ({ locale, onChangeLocale }) => (
  <OptionSwitch
    options={localizationOptions}
    selectedOptionId={locale}
    onChange={onChangeLocale}
  />
);

type StateProps = Pick<LocalizationOptionSwitchProps, "locale">;

const mapStateToProps: MapStateToProps<StateProps, NoneOwnProps, IState> = (state) => ({
  locale: i18n.getLocaleCode(state)
});

type DispatchProps = Pick<LocalizationOptionSwitchProps, "onChangeLocale">;

const actionCreators: MapDispatchToProps<DispatchProps, NoneOwnProps> = (dispatch) => ({
  onChangeLocale: (newLocale: Locale) => dispatch(i18n.createSetLocaleCodeAction(newLocale)),
});

export default connect(
  mapStateToProps,
  actionCreators
)(LocalizationOptionSwitch);
