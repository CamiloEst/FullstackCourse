import Title from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ name, parts }) => {
  return (
    <li>
      <Title text={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </li>
  );
};

export default Course;
