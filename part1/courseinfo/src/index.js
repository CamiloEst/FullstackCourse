import React from "react";
import { createRoot } from "react-dom/client";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = (props) => {
  return props.parts.map((part) => (
    <Part key={part.name} name={part.name} exercises={part.exercises} />
  ));
};

const Total = (props) => {
  const sum = props.parts.reduce((sum, current) => (sum += current.exercises), 0);
  return <b>Number of exercises: {sum}</b>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
