import Input from "./Input";

const PersonForm = ({ addPerson, states, handlers }) => {
  const [newName, newNumber] = states;
  const [handleChangeName, handleChangeNumber] = handlers;
  return (
    <form onSubmit={addPerson}>
      
      <Input text="name" value={newName} changeHandler={handleChangeName} />
      <Input
        text="number"
        value={newNumber}
        changeHandler={handleChangeNumber}
      />

      <div>
        <button type="submit">add</button>
      </div>

    </form>
  );
};

export default PersonForm;
