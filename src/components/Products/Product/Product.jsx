import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardAction,
  Typograpy,
  IconBottom,
} from "@material-ui/core";
import { AddShopingCart } from "@material-ui/icons";

function Product({ product }) {
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="" title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typograpy variant="h5" gutterBottom>
            {product.name}
          </Typograpy>
          <Typograpy variant="h5">{product.price}</Typograpy>
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
