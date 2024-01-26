import React, { lazy, Suspense } from "react";
import { Route, Routes, } from "react-router-dom";
import ErrorBoundary from "./errorBoundary";
import "./index.css"

const GroupingByStatus = lazy(() => import("./Components/app/ticket-dashboard/groupingByStatus"));
const GroupingByUser = lazy(() => import("./Components/app/ticket-dashboard/groupingByUser"));
const GroupingByPriority = lazy(() =>
  import("./Components/app/ticket-dashboard/groupingByPriority")
);
const NavBar = lazy(() => import("./Components/shared/nav-bar/navBar"));

function App() {
  return (
    <ErrorBoundary>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/users" element={<GroupingByUser />} />
          <Route exact path="/priority" element={<GroupingByPriority />} />
          <Route exact path="/status" element={<GroupingByStatus />} />
          <Route path="/" element={<GroupingByUser />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
