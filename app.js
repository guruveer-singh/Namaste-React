const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "I am a H1 tag ! ")
  )
);

console.log(parent);

// const heading = React.createElement("h1", {}, "Hello World from React !");
const root2 = ReactDOM.createRoot(document.getElementById("root1"));
root2.render(parent);
