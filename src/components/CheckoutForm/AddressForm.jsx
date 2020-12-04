import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import FormInput from "./CustomTextField";

function AddressForm({ checkoutToken }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisons, setShippingSubdivisons] = useState([]);
  const [shippingSubdivison, setShippingSubdivison] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  // console.log("countries", countries);

  const subdivisions = Object.entries(shippingSubdivisons).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  // console.log("subdivision", subdivisions);

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));
  console.log("shippingOptions", shippingOptions);

  //function getCountries
  const fetchShippingCountries = async (checkoutTokentId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokentId
    );
    // console.log("countries", countries);
    setShippingCountries(countries);
    //key = [US, ID]
    setShippingCountry(Object.keys(countries)[0]);
  };
  //function getSubdivisions
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisons(subdivisions);
    setShippingSubdivison(Object.keys(subdivisions)[0]);
  };

  //function getOptions
  const fetchShippingOptions = async (
    checkoutTokentId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokentId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
    // console.log("options", options);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivison)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivison
      );
  }, [shippingSubdivison]);

  return (
    <>
      <Typography variant="h6">Shopping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="Address1" label="Addressemail" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="city" />
            <FormInput name="zip" label="ZIP / Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivison}
                fullWidth
                onChange={(e) => setShippingSubdivison(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;