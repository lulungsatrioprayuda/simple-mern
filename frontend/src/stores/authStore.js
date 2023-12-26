import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  checkLoggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },
  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    const { loginForm } = authStore.getState();

    const res = await axios.post("/login", loginForm, {
      withCredentials: true,
    });

    set({
      checkLoggedIn: true,
      loginForm: {
        email: "",
        password: "",
      },
    });

    console.log(res);
  },

  checkAuth: async (e) => {
    try {
      await axios.get("/check-auth");
      set({ checkLoggedIn: true });
    } catch (err) {
      console.log(err);
      set({ checkLoggedIn: false });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();

    const res = await axios.post("/signup", signupForm, {
      withCredentials: true,
    });

    set({
      signupForm: {
        email: "",
        password: "",
      },
    });
    console.log(res);
  },

  logout: async () => {
    await axios.get("/logout");
    set({ checkLoggedIn: false });
  },
}));

export default authStore;
