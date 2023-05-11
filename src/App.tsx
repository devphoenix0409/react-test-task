import { ChakraProvider } from "@chakra-ui/react";
import Task1Screen from "./screens/task1";
import "./styles/style.css";

function App() {
  return (
    <ChakraProvider>
      <Task1Screen />
    </ChakraProvider>
  );
}

export default App;
