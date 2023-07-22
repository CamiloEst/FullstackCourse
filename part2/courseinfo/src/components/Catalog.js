import React from "react";
import Course from "./Course";
import Title from "./Header";

const Catalog = ({ courses }) => {
  return (
    <>
      <Title text={"Web development curriculum"} />
      <ul>
          {courses.map((course) => (
            <Course key={course.id} name={course.name} parts={course.parts} />
          ))}
      </ul>
    </>
  );
};

export default Catalog;
