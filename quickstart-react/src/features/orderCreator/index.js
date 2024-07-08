import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import {
  AttentionBox,
  Button,
  Dropdown,
  Flex,
  TextField,
} from "monday-ui-react-core";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/

const OrderCreator = () => {
  const [options, setOptions] = useState([]);
  const [selectedFragrances, setSelectedFragrances] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchFragrances = async () =>
      fetch("http://localhost:3000/fragrances", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const fragrances = await response.json();
        setOptions(
          fragrances.map((fragrance) => ({
            value: fragrance.name,
            label:
              fragrance.name[0].toUpperCase() + fragrance.name.substring(1),
          }))
        );
      });

    fetchFragrances();
  }, [success, error]);

  const createOrder = () => {
    setErrorMessage("");
    setError(false);
    const issues = [];
    if (selectedFragrances.length !== 3) issues.push(0);
    if (!firstName || !lastName) issues.push(1);
    if (!quantity || quantity < 1) issues.push(2);

    if (issues.length > 0) {
      let errorText = "Please resolve the following issues before submitting:";
      if (issues.includes(0))
        errorText += `
      •Please select exactly 3 fragrances.`;
      if (issues.includes(1))
        errorText += `
      •Please add a valid First and Last name.`;
      if (issues.includes(2))
        errorText += `
      •Please select a quantity greater than 0.`;
      setErrorMessage(errorText);
      setError(true);

      setTimeout(() => {
        setErrorMessage("");
        setError(false);
      }, 10000);
      return;
    }

    let formattedFragrances = "";
    for (let i = 0; i < selectedFragrances.length; i++) {
      if (i !== 0) formattedFragrances += ", ";
      formattedFragrances += selectedFragrances[i].label;
    }

    fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
        "API-Version": "2023-04",
      },
      body: JSON.stringify({
        query: `mutation { create_item (board_id: 6934818866, group_id: \"topics\", item_name: \"New Order\", column_values: \"{\\\"dropdown\\\":\\\"${formattedFragrances}\\\",\\\"numbers\\\":\\\"${quantity}\\\",\\\"text\\\":\\\"${firstName}\\\",\\\"text6\\\":\\\"${lastName}\\\"}\",create_labels_if_missing: true) { id }}`,
      }),
    })
      .then(function (response) {
        console.log("SUCCESS", response);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch(function (e) {
        console.log("ERROR", e);
        setErrorMessage(
          "There was an issue on our end creating this order... Please try again in a few seconds."
        );
        setError(true);
        setTimeout(() => {
          setErrorMessage("");
          setError(false);
        }, 5000);
      });
  };

  return (
    <div className="orderCreator">
      <Flex direction="Column" gap={8} justify="Stretch" align="Stretch">
        <Flex gap={8}>
          <TextField
            size={TextField.sizes.MEDIUM}
            title="First Name"
            required
            requiredAsterisk
            value={firstName}
            onChange={setFirstName}
          />
          <TextField
            size={TextField.sizes.MEDIUM}
            title="Last Name"
            required
            requiredAsterisk={true}
            value={lastName}
            onChange={setLastName}
          />
          <TextField
            size={TextField.sizes.MEDIUM}
            title="Quantity"
            required
            requiredAsterisk={true}
            type={TextField.types.NUMBER}
            value={quantity}
            onChange={setQuantity}
          />
        </Flex>
        <Dropdown
          options={options}
          value={selectedFragrances}
          onChange={setSelectedFragrances}
          multi
          multiline
        />
        {error ? (
          <AttentionBox type={AttentionBox.types.WARNING}>
            <div style={{ whiteSpace: "pre-line" }}>{errorMessage}</div>
          </AttentionBox>
        ) : success ? (
          <AttentionBox type={AttentionBox.types.SUCCESS}>
            Fragrance successfully created!
          </AttentionBox>
        ) : null}
        <Button
          style={{ width: "50%", justifyContent: "start", marginTop: "114px" }}
          onClick={createOrder}
        >
          Start Order
        </Button>
      </Flex>
    </div>
  );
};

export default OrderCreator;
