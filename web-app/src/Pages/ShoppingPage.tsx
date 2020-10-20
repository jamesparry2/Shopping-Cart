import React, { useEffect, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Actions from "../Store/ShoppingCart/actions";
import * as selectors from "../Store/ShoppingCart/selectors";
import { IAddItemAction, Item } from "../Store/ShoppingCart/types";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { CardMedia } from "@material-ui/core";
import { formatGB } from "../Utils/currency";

import { images } from "../Images/images";

interface ShoppingCartProps {
  item: Item;
  dispatch: Dispatch<IAddItemAction>;
}

const ShoppingTile: React.FC<ShoppingCartProps> = ({ item, dispatch }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" image={images[item.id]} height="100px" />
          <CardContent>Product Name: {item.name}</CardContent>
          <CardContent>Product Description: {item.description}</CardContent>
          <CardContent>Price: {formatGB(item.price)}</CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            onClick={() => dispatch(Actions.AddItemToBasketAction({ item }))}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AddIcon />
              <p>Add to basket</p>
            </div>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const ShoppingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.GetItems());
  }, [dispatch]);

  const items = useSelector(selectors.selectItems);

  return (
    <Grid container spacing={2}>
      {items.map((item: Item) => (
        <ShoppingTile item={item} dispatch={dispatch} />
      ))}
    </Grid>
  );
};

export default ShoppingPage;
