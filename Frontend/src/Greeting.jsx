const Greeting = (props) => {
  return (
    <h1 className="text-blue-500 text-2xl mt-4">
      Hello, {props.name}! You are {props.age} years old.
    </h1>
  );
};

export default Greeting;
