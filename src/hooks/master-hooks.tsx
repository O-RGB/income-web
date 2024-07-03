import { MasterContext } from "@/contexts/master.context";
import { useContext } from "react";

export const useDisplay = () => useContext(MasterContext);
