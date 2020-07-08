import { connect } from "react-redux";
import { ScreenTheme } from "components";
import { config } from "config";
import { IState } from "types";

const mapStateToProps = (state: IState) => ({
  isDarkTheme: config.isDarkTheme(state)
});

export default connect(mapStateToProps)(ScreenTheme);
