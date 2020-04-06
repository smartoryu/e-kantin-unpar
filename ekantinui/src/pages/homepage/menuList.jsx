import React, { Fragment, useState } from "react";
import Numeral from "numeral";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";

import ScrollToTop from "../../components/ScrollToTop";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 480,
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 480,
    minHeight: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function MenuList() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { ListFood, ListDrink, Loading } = useSelector(({ MenuList }) => {
    return {
      ListFood: MenuList.listFood,
      ListDrink: MenuList.listDrink,
      Loading: MenuList.loading,
    };
  });

  return (
    <Fragment>
      <ScrollToTop />
      <Toolbar />

      {Loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" color="inherit">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example">
              <Tab label="Makanan" icon={<RestaurantIcon />} {...a11yProps(0)} />
              <Tab label="Minuman" icon={<LocalCafeIcon />} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {ListFood.map((food, index) => {
              return (
                <ListItem
                  component={Link}
                  to={{ pathname: "/profil", id: food.profileId }}
                  key={food.menuId}
                  button
                  className={classes.nested}>
                  <ListItemText primary={"Rp " + Numeral(food.menuPrice).format("0,0")} />
                  <ListItemText style={{ width: 180 }} primary={food.menuName} secondary={`Kantin ${food.standName}`} />
                </ListItem>
              );
            })}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {ListDrink.map((drink, index) => {
              return (
                <ListItem
                  component={Link}
                  to={{ pathname: "/profil", id: drink.profileId }}
                  key={drink.menuId}
                  button
                  className={classes.nested}>
                  <ListItemText primary={"Rp " + Numeral(drink.menuPrice).format("0,0")} />
                  <ListItemText style={{ width: 180 }} primary={drink.menuName} secondary={`Kantin ${drink.standName}`} />
                </ListItem>
              );
            })}
          </TabPanel>
        </div>
      )}

      {/* END OF ROOT */}
    </Fragment>
  );
}

// const daftarMakanan = [
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
//   { name: "Nasi Goreng Merah", description: "nasi goreng saos", price: 15000 },
//   { name: "Mie Goreng", description: "mie yang digoreng", price: 15000 },
//   { name: "Mie Rebus", description: "mie yang direbus", price: 15000 },
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
//   { name: "Nasi Goreng Merah", description: "nasi goreng saos", price: 15000 },
//   { name: "Mie Goreng", description: "mie yang digoreng", price: 15000 },
//   { name: "Mie Rebus", description: "mie yang direbus", price: 15000 },
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
//   { name: "Nasi Goreng Merah", description: "nasi goreng saos", price: 15000 },
//   { name: "Mie Goreng", description: "mie yang digoreng", price: 15000 },
//   { name: "Mie Rebus", description: "mie yang direbus", price: 15000 },
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
//   { name: "Nasi Goreng Merah", description: "nasi goreng saos", price: 15000 },
//   { name: "Mie Goreng", description: "mie yang digoreng", price: 15000 },
//   { name: "Mie Rebus", description: "mie yang direbus", price: 15000 },
//   { name: "Cap Cay", description: "yur sayur", price: 12000 },
//   { name: "Nasi Goreng", description: "nasi goreng kecap saos", price: 15000 },
// ];

// const daftarMinuman = [
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Teh Tawar", description: "dingin/panas", price: 3000 },
//   { name: "Teh Manis", description: "dingin/panas", price: 4000 },
//   { name: "Kopi", description: "dingin/panas", price: 4000 },
//   { name: "Mineral Prima", description: "botol dingin/panas", price: 5000 },
// ];

export default MenuList;
