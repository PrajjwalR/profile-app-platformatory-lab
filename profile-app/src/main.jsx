import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-b5nt3k36p88bpinn.us.auth0.com"
    clientId="pJyvqQQLdPr4mn5ToYRfJARr5yDQSKfx"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
