import { create } from "zustand"; // Correct import

const useAuthUserStore = create((set) => ({
  authUser: null,
  isOwner: false,
  projectName: "",
  projectId: "",
  setAuthUser: (authUser) => set({ authUser }),
}));

export default useAuthUserStore; // Export the store
