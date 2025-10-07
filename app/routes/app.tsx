import type { LoaderFunctionArgs } from "react-router";
import { Outlet } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Temporarily bypass auth for testing
  // await authenticate.admin(request);
  
  return {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    testMode: true
  };
};

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <nav style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#333" }}>NextGen Smart Variants</h1>
        <div>
          <a href="/app" rel="home" style={{ marginRight: "20px", color: "#667eea", textDecoration: "none" }}>
            🏠 Home
          </a>
          <a href="/app/variants" style={{ marginRight: "20px", color: "#667eea", textDecoration: "none" }}>
            🎨 Variants
          </a>
          <a href="/app/settings" style={{ color: "#667eea", textDecoration: "none" }}>
            ⚙️ Settings
          </a>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
