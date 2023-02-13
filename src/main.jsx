import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import Home from "./Pages/Home";
import ClientForm from "./Routes/Forms/ClientForm";
import TransactionForm from "./Routes/Forms/TransactionForm";
import PaymentForm from "./Routes/Forms/PaymentForm";
import ExpensesForm from "./Routes/Forms/ExpensesForm";
import ClientInfoForm from "./Routes/Forms/ClientInfoForm";
import ServicesList from "./Routes/Forms/ServicesList";
import TransactionsTable from "./Routes/Tables/TransactionsTable";
import RevenuesTable from "./Routes/Tables/RevenuesTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./reset.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/client",
                element: <ClientForm />,
            },
            {
                path: "/transaction",
                element: <TransactionForm />,
            },
            {
                path: "/payment",
                element: <PaymentForm />,
            },
            {
                path: "/expense",
                element: <ExpensesForm />,
            },
            {
                path: "/transactions",
                element: <TransactionsTable />,
            },
            {
                path: "/revenues",
                element: <RevenuesTable />,
            },
            {
                path: "/clientinfo",
                element: <ClientInfoForm />,
            },
            {
                path: "/serviceslist",
                element: <ServicesList />,
            },
        ],
    },
]);

ReactDOM.render(
    <FirebaseContextProvider>
        <AuthContextProvider>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </AuthContextProvider>
    </FirebaseContextProvider>,
    document.getElementById("root")
);

reportWebVitals();
