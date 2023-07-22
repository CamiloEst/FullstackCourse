
const Total = ({parts}) => {
    const sum = parts.reduce((sum, current) => (sum += current.exercises), 0);
    return <b>Number of exercises: {sum}</b>;
  };

  export default Total
