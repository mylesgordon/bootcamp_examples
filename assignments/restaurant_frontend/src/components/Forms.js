import { useState } from "react";

const Forms = () => {
  const [formData, setFormData] = useState({ name: "", imageLink: "" });

  const handleNameChange = (event) => {
    setFormData({ name: event.target.value, imageLink: formData.imageLink });
  };

  const handleLinkChange = (event) => {
    setFormData({ name: formData.name, imageLink: event.target.value });
  };

  const handleSubmit = (event) => {
    const body = `{"name": "${formData.name}", "imageLink": "${formData.imageLink}"}`;
    fetch("http://localhost:3002/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then(() => alert(`Posted ${formData.name} and ${formData.imageLink}`))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Create a restaurant</h2>
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
    </div>
  );
};
export default Forms;
