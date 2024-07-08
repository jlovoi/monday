import React, { useEffect, useState } from "react";
import "./styles.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import {
  AttentionBox,
  Button,
  Divider,
  Dropdown,
  Flex,
} from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";

const FragranceDeleter = ({ postSuccess }) => {
  const [options, setOptions] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
  }, [deleteSuccess, postSuccess]);

  const deleteFragrance = () => {
    fetch("http://localhost:3000/fragrances/" + selectedFragrance.value, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((_res) => {
      setConfirmDelete(false);
      setSelectedFragrance(null);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 5000);
    });
  };

  return (
    <>
      <Divider className="heading" />
      <Heading className="heading">Delete Fragrances</Heading>
      <Flex direction="Column" gap={8} style={{ width: "100vw" }}>
        <Dropdown
          size={Dropdown.sizes.LARGE}
          className="dropdown"
          options={options}
          value={selectedFragrance}
          onChange={setSelectedFragrance}
        />
        {confirmDelete ? (
          <AttentionBox type={AttentionBox.types.DANGER}>
            Are you sure you want to delete this fragrance? This cannot be
            undone.
            <Flex gap={8} style={{ marginTop: "8px" }}>
              <Button color={Button.colors.NEGATIVE} onClick={deleteFragrance}>
                Yes
              </Button>
              <Button
                color={Button.colors.POSITIVE}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </Flex>
          </AttentionBox>
        ) : null}
        {deleteSuccess ? (
          <AttentionBox type={AttentionBox.types.SUCCESS}>
            Fragrance Successfully Deleted!
          </AttentionBox>
        ) : null}
        <Button
          style={{ width: "50%", justifyContent: "start", marginTop: "40px" }}
          color={Button.colors.NEGATIVE}
          onClick={() => setConfirmDelete(true)}
          disabled={!selectedFragrance}
        >
          Delete Fragrance
        </Button>
      </Flex>
    </>
  );
};

export default FragranceDeleter;
