import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TrainSimulation from "./pages/TrainSimulation";
import AIDecisionSupport from "./pages/AIDecisionSupport";
import LiveTrainStatus from "./pages/LiveTrainStatus";
import WeatherImpact from "./pages/WeatherImpact";
import MargdarshakAssistant from "./pages/MargdarshakAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page without layout */}
          <Route path="/" element={<Landing />} />
          
          {/* Dashboard and features with layout */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/simulation" element={<Layout><TrainSimulation /></Layout>} />
          <Route path="/ai-decision" element={<Layout><AIDecisionSupport /></Layout>} />
          <Route path="/live-status" element={<Layout><LiveTrainStatus /></Layout>} />
          <Route path="/weather-impact" element={<Layout><WeatherImpact /></Layout>} />
          <Route path="/assistant" element={<Layout><MargdarshakAssistant /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
