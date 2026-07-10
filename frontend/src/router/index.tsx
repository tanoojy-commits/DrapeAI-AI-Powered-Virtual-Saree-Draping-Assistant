import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AboutPage } from "@/pages/public/AboutPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { FaqPage } from "@/pages/public/FaqPage";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ErrorPage } from "@/pages/errors/ErrorPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <AuthenticatedLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);

