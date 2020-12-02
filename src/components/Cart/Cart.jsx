import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

function Cart({ cart }) {
  console.log("cart", cart);

  const isEmpty = !cart.line_items.length;
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Yout have no items in your shopping cart, start adding some!
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xm={12} sm={4} key={item.id}>
            <div>{item.name}</div>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained "
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained "
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h4">
          {" "}
          Your Shoping Cart
        </Typography>
      </div>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
