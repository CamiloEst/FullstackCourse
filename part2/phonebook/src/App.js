import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personServices from "./services/persons";
import SuccesMessage from "./components/SuccesMessage"
import ErrorMessage from "./components/ErrorMessage"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const showMessage = (messageFunction, timeOut, message) =>{
    messageFunction(message)
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
    messageFunction(null)
          }, timeOut);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personFind = persons.find((p) => p.name === newName);

    if (personFind !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personServices
          .update(personFind.id, { ...personFind, number: newNumber })
          .then((returnedPerson) =>{
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              ))
              showMessage(setSuccesMessage,5000, `${newName} has been modified`)
            })}
      } else {
        const newPerson = {
          name: newName.trim(),
          number: newNumber.trim(),
        };
        personServices.create(newPerson).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          showMessage(setSuccesMessage,5000,`Added ${newName}`)
        });
      }
    }

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value.trim());
  };

  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const deletePersonHandler = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`))
      personServices
        .deletePerson(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch((err) =>{
          showMessage(setErrorMessage,5000,`Information of ${name} has aleready been removed from de server`)
        })
      };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccesMessage message={succesMessage}/>
      <ErrorMessage message={errorMessage}/>
      <Input
        text="filter shown with "
        value={newSearch}
        changeHandler={handleChangeSearch}
      />
      <h2> Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        states={[newName, newNumber]}
        handlers={[handleChangeName, handleChangeNumber]}
      />
      <h2>Numbers</h2>
      <Persons
        searchPerson={newSearch}
        persons={persons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
