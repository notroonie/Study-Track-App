import React, { useState } from "react";
import Alert from "../../components/Alert";
import FormRow from "../../components/FormRow";
import { useAppContext } from "../../context/context";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="form">
        <h3>
          <CgProfile /> My Account
        </h3>
        {showAlert && <Alert />}
        <FormRow
          type="text"
          name="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormRow
          labelText="last name"
          type="text"
          name="lastName"
          value={lastName}
          handleChange={(e) => setLastName(e.target.value)}
        />
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "save changes"}
        </button>
      </form>
    </section>
  );
};

export default Profile;
