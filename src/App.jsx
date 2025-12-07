import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import GameScreen from "./pages/GameScreen";

const WelcomeScreen = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      color: "white",
      textAlign: "center",
      padding: "2rem",
    }}
  >
    <div
      style={{
        fontSize: "4rem",
        marginBottom: "1rem",
      }}
    >
      ⚡
    </div>
    <h1
      style={{
        fontSize: "3rem",
        fontWeight: 800,
        background:
          "linear-gradient(135deg, #c084fc 0%, #6366f1 50%, #22d3ee 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem",
      }}
    >
      Mana Clicker
    </h1>
    <p
      style={{
        fontSize: "1.25rem",
        color: "#94a3b8",
        marginBottom: "2rem",
        maxWidth: "400px",
      }}
    >
      Collect mana, build your magical empire, and become the most powerful
      wizard!
    </p>
    <SignInButton mode="modal">
      <button
        style={{
          padding: "1rem 2.5rem",
          fontSize: "1.125rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 6px 30px rgba(99, 102, 241, 0.5)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(99, 102, 241, 0.4)";
        }}
      >
        🎮 Sign in & Play
      </button>
    </SignInButton>
    <p
      style={{
        marginTop: "3rem",
        fontSize: "0.875rem",
        color: "#475569",
      }}
    >
      Free idle game • Cloud saves • Play on any device
    </p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <GameScreen />
              </SignedIn>
              <SignedOut>
                <WelcomeScreen />
              </SignedOut>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
