import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleRouter from "@/components/RoleRouter";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApproval from "./pages/PendingApproval";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute requireAuth={false}><Register /></ProtectedRoute>} />
            <Route path="/dashboard/*" element={<ProtectedRoute><RoleRouter /></ProtectedRoute>} />
            <Route path="/user/*" element={<ProtectedRoute requireRole="user"><RoleRouter /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute requireRole="admin"><RoleRouter /></ProtectedRoute>} />
            <Route path="/psda/*" element={<ProtectedRoute requireRole="psda"><RoleRouter /></ProtectedRoute>} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
