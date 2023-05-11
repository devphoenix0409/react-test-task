import { ChakraProvider } from "@chakra-ui/react";
import Task1Component from "./screens/task1";
import "./styles/style.css";

function App() {
  return (
    <ChakraProvider>
      <Task1Component />
    </ChakraProvider>
  );
}

export default App;
