import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/Components/Ui/Sonner";
import { Toaster } from "@/Components/Ui/Toaster";
import { TooltipProvider } from "@/Components/Ui/Tooltip";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/Notfound.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import FarmerDashboard from "./pages/Farmer/Farmerdashboard.jsx";
import FarmerDiscussion from "./pages/Farmer/Farmerdiscussion.jsx";
import AddCrop from "./pages/Farmer/Addcrop.jsx";
import MyCrops from "./pages/Farmer/Mycrops.jsx";
import FarmerOrders from "./pages/Farmer/Farmerorders.jsx";
import FarmerProfile from "./pages/Farmer/Farmerprofile.jsx";

import Marketplace from "./pages/Buyer/Marketplace.jsx";
import CropDetails from "./pages/Buyer/Cropdetails.jsx";
import Cart from "./pages/Buyer/Cart.jsx";
import Checkout from "./pages/Buyer/Checkout.jsx";

import DeliveryDashboard from "./pages/Delivery/Deliverydashboard.jsx";
import DeliveryTracking from "./pages/Delivery/Deliverytracking.jsx";

import AIPrice from "./pages/Analytics/Aiprice.jsx";
import Chatbot from "./pages/Analytics/Chatbot.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/analytics/chatbot" element={<Chatbot />} />
          <Route path="/farmer/discussion" element={<FarmerDiscussion />} />
          <Route path="/farmer/add-crop" element={<AddCrop />} />
          <Route path="/farmer/my-crops" element={<MyCrops />} />
          <Route path="/farmer/orders" element={<FarmerOrders />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/crop/:id" element={<CropDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/delivery/tracking" element={<DeliveryTracking />} />
          <Route path="/ai-price" element={<AIPrice />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;