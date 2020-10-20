import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { formatGB } from "../Utils/currency";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

import * as Actions from "../Store/ShoppingCart/actions";
import * as selectors from "../Store/ShoppingCart/selectors";
import { Discount, Item } from "../Store/ShoppingCart/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("sm")]: {
        marginRight: "auto",
        marginLeft: "auto",
        width: "35%",
      },
      padding: "10px",
      background: "#ededed",
      border: "1px solid #817B7A",
      boxShadow: "-1px 1px #817B7A",
    },
    buttonBar: {
      paddingTop: "10px",
    },
    button: {
      margin: "10px",
    },
  })
);

const formatDiscountText = ({
  hasBeenApplied,
  hasBeenUsed,
}: Discount): string => {
  if (hasBeenUsed) {
    return "Discount been used before";
  }

  return hasBeenApplied ? "Applied " : "Available ";
};

export interface CheckoutListProps {
  ref: React.MutableRefObject<undefined>;
}

export const CheckoutPage = () => {
  const classes = useStyles();
  const basket = useSelector(selectors.selectBasket);
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.root}>
        <List dense id="print-section">
          {basket.map((item: Item) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={formatGB(item.price)}
              />
              <ListItemSecondaryAction>
                {item.discount ? (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(Actions.ApplyDiscountToItemAction({ item }));
                    }}
                    disabled={item.discount.hasBeenUsed}
                  >
                    <LocalOfferIcon
                      color={
                        item.discount.hasBeenApplied ? "primary" : "secondary"
                      }
                    />
                    <Typography>{formatDiscountText(item.discount)}</Typography>
                  </IconButton>
                ) : null}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    dispatch(
                      Actions.RemoveItemFromBasketAction({ id: item.id })
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.buttonBar}>
        {formatGB(
          basket.reduce((accum: number, { price }: Item) => accum + price, 0)
        )}
        <Button
          variant="contained"
          id="print-button"
          className={classes.button}
          onClick={() => window.print()}
        >
          Print Recipt
        </Button>
        <Button
          variant="contained"
          color="secondary"
          id="clear-button"
          className={classes.button}
          onClick={() => {
            dispatch(Actions.RemoveAllItemsFromBasketAction());
          }}
        >
          Clear Items
        </Button>
        <Button
          variant="contained"
          color="primary"
          id="purchase-button"
          className={classes.button}
          onClick={() => {
            dispatch(Actions.CreateOrder(basket));
          }}
        >
          Purchase Order
        </Button>
      </div>
    </>
  );
};

export default CheckoutPage;
