import React, { useState } from "react";
import "./styles.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { AttentionBox, Button, Flex, TextField } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import FragranceDeleter from "./deleter";

const FragranceManager = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [updatePrompt, setUpdatePrompt] = useState(false);

  const submit = () => {
    if (!name || !category) {
      setError(true);
      setErrorMessage("Please fill out the Name and Category fields!");
      setTimeout(() => {
        setError(false);
        setErrorMessage(null);
      }, 5000);
      return;
    }

    fetch("http://localhost:3000/fragrances", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        description: desc,
        image_url: url,
      }),
    })
      .then(function (response) {
        if (response.status !== 201) {
          setUpdatePrompt(true);
        } else {
          console.log("SUCCESS", response);
          setSuccess(true);
          setSuccessMessage(`${name} fragrance created successfully!`);
          setName("");
          setCategory("");
          setDesc("");
          setUrl("");

          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      })
      .catch(function (e) {
        console.log("ERROR", e);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

  const update = () => {
    fetch("http://localhost:3000/fragrances", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        description: desc,
        image_url: url,
      }),
    })
      .then(function (response) {
        if (response.status !== 201) {
          setUpdatePrompt(true);
        } else {
          console.log("SUCCESS", response);
          setSuccess(true);
          setSuccessMessage(`${name} fragrance updated successfully!`);
          setName("");
          setCategory("");
          setDesc("");
          setUrl("");
          setUpdatePrompt(false);

          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      })
      .catch(function (e) {
        console.log("ERROR", e);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };
  return (
    <div className="fragranceManager">
      <Heading className="heading">Create/Update Fragrances</Heading>
      <Flex direction="Column" gap={8} justify="Stretch" align="Stretch">
        <Flex gap={8}>
          <TextField
            size={TextField.sizes.MEDIUM}
            title="Name"
            required
            requiredAsterisk={true}
            value={name}
            onChange={setName}
          />
          <TextField
            size={TextField.sizes.MEDIUM}
            title="Category"
            required
            requiredAsterisk={true}
            value={category}
            onChange={setCategory}
          />
        </Flex>
        <Flex gap={8}>
          <TextField
            size={TextField.sizes.MEDIUM}
            title="Description"
            value={desc}
            onChange={setDesc}
          />
        </Flex>
        <Flex gap={8}>
          <TextField
            size={TextField.sizes.MEDIUM}
            title="URL"
            value={url}
            onChange={setUrl}
          />
        </Flex>
        {updatePrompt ? (
          <AttentionBox type={AttentionBox.types.WARNING}>
            {`A Fragrance with that name already exists in our database!
            Do you wish to update it with this information?`}
            <Flex gap={8} style={{ marginTop: "8px" }}>
              <Button color={Button.colors.POSITIVE} onClick={update}>
                Update
              </Button>
              <Button
                color={Button.colors.NEGATIVE}
                onClick={() => setUpdatePrompt(false)}
              >
                Cancel
              </Button>
            </Flex>
          </AttentionBox>
        ) : null}
        {error ? (
          <AttentionBox type={AttentionBox.types.DANGER}>
            {errorMessage}
          </AttentionBox>
        ) : success ? (
          <AttentionBox type={AttentionBox.types.SUCCESS}>
            {successMessage}
          </AttentionBox>
        ) : null}
        <Button
          style={{ width: "50%", justifyContent: "start", marginTop: "40px" }}
          onClick={submit}
        >
          Submit Fragrance
        </Button>
      </Flex>
      <FragranceDeleter postSuccess={success} />
    </div>
  );
};

export default FragranceManager;
