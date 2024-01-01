import { create } from "zustand";
import { WorkerDetails } from "./apis/client/types";
import { Category } from "./types/api";

interface CartState {
  cart: WorkerDetails[];
  addWorker: (worker: WorkerDetails) => void;
  skill: Category[]
  addCategory: (category: Category) => void
}

const useWorkerStore = create<CartState>()((set) => ({
  cart: [],
  addWorker: (worker) => set((state) => ({ cart: [...state.cart, worker] })),
  skill: [],
  addCategory: (category) => set((state) => ({ skill: [...state.skill, category] })),
}));

export default useWorkerStore;
