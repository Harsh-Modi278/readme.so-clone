import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Header />
        <Main />
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
