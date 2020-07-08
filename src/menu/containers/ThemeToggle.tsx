import { connect } from "react-redux";
import { Toggle } from "components";
import { config } from "config";

const mapStateToProps = (state: any) => ({
  defaultChecked: config.isDarkTheme(state)
});

const actionCreators = {
  onChange: config.actionToggleDarkThemeCreator
};

export default connect(
  mapStateToProps,
  actionCreators
)(Toggle);
