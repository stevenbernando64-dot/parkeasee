import { useState, useEffect } from "react";
import { ParkingArea, ParkingSlot, Reservation, VehicleLog } from "../types";
import { MOCK_AREAS, INITIAL_SLOTS, INITIAL_LOGS } from "../data/mockData";
import AuthScreen from "./AuthScreen";
import DriverDashboard from "./DriverDashboard";
import PassengerDashboard from "./PassengerDashboard";

export default function Dashboard() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ email: string; role: "driver" | "passenger" } | null>(() => {
    const saved = localStorage.getItem("parkease_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Core Synced Database in RAM State
  const [areas, setAreas] = useState<ParkingArea[]>(() => {
    const saved = localStorage.getItem("parkease_areas");
    return saved ? JSON.parse(saved) : MOCK_AREAS;
  });

  const [slots, setSlots] = useState<ParkingSlot[]>(() => {
    const saved = localStorage.getItem("parkease_slots");
    return saved ? JSON.parse(saved) : INITIAL_SLOTS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem("parkease_reservations");
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<VehicleLog[]>(() => {
    const saved = localStorage.getItem("parkease_logs");
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  // Central Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("parkease_areas", JSON.stringify(areas));
  }, [areas]);

  useEffect(() => {
    localStorage.setItem("parkease_slots", JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem("parkease_reservations", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("parkease_logs", JSON.stringify(logs));
  }, [logs]);

  // Handle Auth success
  const handleAuthSuccess = (user: { email: string; role: "driver" | "passenger" }) => {
    setCurrentUser(user);
    localStorage.setItem("parkease_current_user", JSON.stringify(user));
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("parkease_current_user");
    // Optionally clear active passenger request
    localStorage.removeItem("parkease_passenger_request");
  };

  // If NOT Logged In, Render standard unified Indonesian custom Login/Register Wizard
  if (!currentUser) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  // If logged in as Pengemudi (Driver)
  if (currentUser.role === "driver") {
    return (
      <DriverDashboard 
        userEmail={currentUser.email}
        areas={areas}
        setAreas={setAreas}
        slots={slots}
        setSlots={setSlots}
        reservations={reservations}
        setReservations={setReservations}
        logs={logs}
        setLogs={setLogs}
        onLogout={handleLogout}
      />
    );
  }

  // If logged in as Penumpang (Passenger)
  return (
    <PassengerDashboard 
      userEmail={currentUser.email}
      areas={areas}
      slots={slots}
      logs={logs}
      onLogout={handleLogout}
    />
  );
}
