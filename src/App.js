import Form from "./components/form";
import Scoops from "./components/scopps";
import Toppings from "./components/toppings";

function App() {
  return (
    <>
      {/* kinds */}
      <Scoops />
      {/* sauces */}
      <Toppings />
      {/* form */}
      <Form />
    </>
  );
}

export default App;
