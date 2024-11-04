import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Base18nProvider } from "@base/i18n/Base18n";
import AppRoutes from "@app/routes/AppRoutes";
import { AuthProvider } from "@app/modules/auth/core/contexts/AuthContext";
import { ThemeProvider } from "@base/layout/contexts/ThemeContext";

// const error = console.error;
// const warn = console.warn;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    if (/unique "key"/.test(args[0])) return;
    if (/'beforeunload'/.test(args[0])) return;
    if (/Unable to find drag handle/.test(args[0])) return;
    // error(...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = (...args: any) => {
    if (/Unable to find drag handle with id/.test(args[0])) return;
    // warn(...args);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <NextUIProvider>
        <ThemeProvider>
            <HelmetProvider>
                <Base18nProvider>
                    <AuthProvider>
                        <AppRoutes />
                    </AuthProvider>
                </Base18nProvider>
            </HelmetProvider>
        </ThemeProvider>
    </NextUIProvider>
);
