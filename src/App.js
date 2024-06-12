import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import SellerForm from "./components/SellerForm";
import BillingForm from "./components/BillingForm";
import ShippingForm from "./components/ShippingForm";
import OrderForm from "./components/OrderForm";
import InvoiceForm from "./components/InvoiceForm";
import AddItemForm from "./components/AddItemForm";
import Invoice from "./components/Invoice";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route exact path="/" element={<SellerForm />} />
            <Route path="/billing" element={<BillingForm />} />
            <Route path="/shipping" element={<ShippingForm />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/invoice" element={<InvoiceForm />} />
            <Route path="/itemdetails" element={<AddItemForm />} />
            <Route path="/checkout" element={<Invoice />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
