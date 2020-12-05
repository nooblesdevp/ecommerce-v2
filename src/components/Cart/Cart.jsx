import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

import useStyles from "./styles";

function Cart({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) {
  console.log("cart", cart);

  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Yout have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xm={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
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
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
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

  if (!cart.line_items) return "loading...";

  return (
    <Container>
      <CssBaseline />
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h4">
          {" "}
          Your Shoping Cart
        </Typography>
      </div>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
