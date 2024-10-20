import { useAuthState } from "react-firebase-hooks/auth";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { auth } from "./config/firebase";
import TasksPage from "./components/TasksPage";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      {user ? <TasksPage /> : <Hero />}
    </>
  );
}

export default App;
