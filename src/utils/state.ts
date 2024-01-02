import { create } from "zustand";
import { WorkerDetails } from "./apis/client/types";
import { Category } from "./types/api";
import { TransactionInfo } from "./apis/worker/types";

interface CartState {
  cart: WorkerDetails[];
  addWorker: (worker: WorkerDetails) => void;
  skill: Category[];
  addCategory: (category: Category) => void;
  payment: TransactionInfo[];
  addPayment: (checkPayment: TransactionInfo) => void;
}

const useWorkerStore = create<CartState>()((set) => ({
  payment: [],
  addPayment: (checkPayment) =>
    set((state) => ({ payment: [...state.payment, checkPayment] })),
  cart: [],
  addWorker: (worker) => set((state) => ({ cart: [...state.cart, worker] })),
  skill: [],
  addCategory: (category) =>
    set((state) => ({ skill: [...state.skill, category] })),
}));

export default useWorkerStore;
