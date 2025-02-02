import { create } from "zustand"; // Correct import

const useAuthUserStore = create((set) => ({
  authUser: null,
  userRole: "",
  projectName: "",
  projectId: "",
  setAuthUser: (authUser) => set({ authUser }),
  setUserRole: (userRole : string) => set({ userRole }),
  setProjectName: (projectName : string) => set({ projectName }),
  setProjectId: (projectId : string) => set({ projectId }),
}));

export default useAuthUserStore; // Export the store
