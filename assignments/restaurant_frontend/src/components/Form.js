import { useState } from "react";

const Form = ({ method, id }) => {
  const [formData, setFormData] = useState({ name: "", imageLink: "" });

  const handleNameChange = (event) => {
    setFormData({ name: event.target.value, imageLink: formData.imageLink });
  };

  const handleLinkChange = (event) => {
    setFormData({ name: formData.name, imageLink: event.target.value });
  };

  const handleSubmit = (event) => {
    const template = `"name": "${formData.name}", "imageLink": "${formData.imageLink}"`;

    // for PUT requests
    let idTemplate = "";
    if (typeof id != "undefined") {
      idTemplate = `, "id": ${id}`;
    }

    const body = `{${template} ${idTemplate}}`;
    console.log(body);

    fetch("http://localhost:3002/api/restaurant", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <textarea value={formData.name} onChange={handleNameChange} />
      </label>
      <br />
      <label htmlFor="imageLink">
        Image Link:
        <textarea value={formData.imageLink} onChange={handleLinkChange} />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
export default Form;
