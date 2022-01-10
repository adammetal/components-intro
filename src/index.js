/**
 * This example is i hope preparing the mental model
 * for component oriented programming.
 */

const api = "https://api.chucknorris.io/jokes/random";

// Model
const getJoke = async () => {
  const res = await fetch(api);
  const joke = await res.json();
  return joke.value;
};

// Component
const JokeDiv = (props) => {
  const className = props.className;
  const onClick = props.onClick;
  const text = props.text;

  // ui part. dynamic dom for component ui
  const jokeDiv = document.createElement("div");
  jokeDiv.innerText = text;
  jokeDiv.className = className;

  // interactions
  jokeDiv.addEventListener("click", onClick);

  // Imperative way to update the ui for component
  const update = (nextProps) => {
    jokeDiv.innerText = nextProps.text;
    jokeDiv.className = nextProps.className;
  };

  return [jokeDiv, update];
};

// Component
const Joke = async (props) => {
  // model
  let text = await getJoke();

  // side effect handling
  // click handler for get new jokes
  const fetchNewJoke = async () => {
    const newText = await getJoke();
    text = newText;

    update({
      text: text,
      className: props.className,
    });
  };

  // "render" child component
  const [jokeDiv, update] = JokeDiv({
    className: props.className,
    onClick: fetchNewJoke,
    text: text,
  });

  return jokeDiv;
};

// Controller or root component
const displayJokes = async () => {
  const jokeComp = await Joke({
    className: "joke",
    from: "norris",
  }); // component render

  const jokeComp2 = await Joke({
    className: "small-joke",
    from: "police",
  }); // component render

  /*
    <Joke className="small-joke" from="norris" />
    <Joke className="joke" from="police" />
  */

  document.getElementById("root").innerHTML = "";
  
  // assemble the final ui
  document.getElementById("root").append(jokeComp, jokeComp2);
};

window.addEventListener("load", () => {
  displayJokes();
});
