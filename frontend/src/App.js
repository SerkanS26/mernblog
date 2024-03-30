// react bootstrap
import { Container } from "react-bootstrap";

// react router dom
import { Outlet } from "react-router-dom";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
