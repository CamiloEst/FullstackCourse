import React from "react";

const Persons = ({ searchPerson, persons, deletePersonHandler }) => {
  const personsToShow =
    searchPerson === ""
      ? persons
      : persons.filter((person) =>
          person.name.toUpperCase().includes(searchPerson.toUpperCase().trim())
        );

  return (
    <ul>
      {personsToShow.map((p) => (
        <li key={p.id}>
          {p.name}: {p.number}
          <button onClick={() => deletePersonHandler(p.id, p.name)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
