import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { global, updateStore, State } from "../context/GlobalStates";

const Routes = () => {
  const store: State = global((state: any) => state);

  return <>{!store.loggedIn ? <AuthRoutes /> : <AppRoutes />}</>;
};

export default Routes;
