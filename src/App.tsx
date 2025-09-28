import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
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
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulation" element={<TrainSimulation />} />
            <Route path="/ai-decision" element={<AIDecisionSupport />} />
            <Route path="/live-status" element={<LiveTrainStatus />} />
            <Route path="/weather-impact" element={<WeatherImpact />} />
            <Route path="/assistant" element={<MargdarshakAssistant />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
