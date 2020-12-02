import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    marginRight: "20px",
    marginBottom: "20px",
  },
  media: {
    height: 0,
    //width: "120px",
    paddingTop: "56.25%", //16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
