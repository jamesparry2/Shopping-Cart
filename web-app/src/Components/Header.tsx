import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as Actions from "../Store/ShoppingCart/actions";
import * as selectors from "../Store/ShoppingCart/selectors";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";

// Change to List Item
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Item } from "../Store/ShoppingCart/types";
import { formatGB } from "../Utils/currency";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
      background: "#55c8ed",
    },
    icon: {
      paddingRight: "2rem",
    },
    shoppingButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    titleHeader: {
      flex: 1,
    },
  })
);

const ApplicationHeader: React.FC = () => {
  const classes = useStyles();
  const basket = useSelector(selectors.selectBasket);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, toggleView] = React.useState(Boolean(anchorEl));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    toggleView(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleView(!isOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h5" className={classes.titleHeader}>
            Veygo Shopping Experince
          </Typography>
          <div>
            <IconButton
              aria-label="checkout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
              disabled={basket.length <= 0}
            >
              <Typography variant="h6">Checkout</Typography>
              <ShoppingCartIcon />
              <Menu
                id="checkout-menu-list"
                anchorEl={anchorEl}
                open={isOpen}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handleClose}
              >
                {basket.map((item: Item) => (
                  <MenuItem>
                    {item.name} {formatGB(item.price)}{" "}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        dispatch(
                          Actions.RemoveItemFromBasketAction({ id: item.id })
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </MenuItem>
                ))}
                {basket.length > 0 ? (
                  <MenuItem>
                    <Link to="/checkout">View Basket</Link>
                  </MenuItem>
                ) : null}
              </Menu>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ApplicationHeader;
