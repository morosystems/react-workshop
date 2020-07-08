import { connect } from "react-redux";
import { Menu } from "components";
import { config } from "config";
import { IState } from "types";

const mapStateToProps = (state: IState) => ({
  isDarkTheme: config.isDarkTheme(state)
});

export default connect(mapStateToProps)(Menu);
