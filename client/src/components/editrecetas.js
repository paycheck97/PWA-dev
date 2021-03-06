import React, { Component } from "react";
import "./editrecetas.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Edit from "./edit";
import MenuAppBar from "./navbar_admin";

const styles = theme => ({});

/**
 * Contiene a Edit + el Navbar.
 * @visibleName Container/Admin/Edit
 */

class dashboard extends Component {
  state = {};

  render() {
    return (
      <>
        <MenuAppBar />
        <Edit />
      </>
    );
  }
}
dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(dashboard);
