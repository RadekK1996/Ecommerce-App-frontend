import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navbar";
import { ShopPage } from "./pages/shop";
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ShopPage></ShopPage>} />
            <Route path="/auth" element={<AuthPage></AuthPage>} />
            <Route path="/checkout" element={<CheckoutPage></CheckoutPage>} />
            <Route
              path="/purchased-items"
              element={<PurchasedItemsPage></PurchasedItemsPage>}
            />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
