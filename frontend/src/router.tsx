import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeView from "./views/WelcomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import MenuView from "./views/MenuView";
import PerfilView from "./views/PerfilView";
import PlatosView from "./views/PlatosView";
import PreferenciasView from "./views/PreferenciasView";
import MisReservas from "./views/ReservasView";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/preferencias" element={<PreferenciasView />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/menu" element={<MenuView />} />
          <Route path="/perfil" element={<PerfilView />} />
          <Route path="/platos" element={<PlatosView />} />
          <Route path="/reservas" element={<MisReservas />} />
          {/* Aquí puedes agregar más rutas privadas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}