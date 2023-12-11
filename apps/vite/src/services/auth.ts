import { nestAPI } from "./nestAPI";
import { setUser } from "../store/user";
import { store } from "../store";

export const login = async ({ email, password, navigate, setError }: any) => {
  await nestAPI
    .post("/auth/login", { email, password })
    .then(({ data }) => {
      store.dispatch(setUser(data));
      navigate("/invoices");
    })
    .catch((error) => {
      if ([401, 404].includes(error.response?.status)) {
        setError("root", {
          message: "Invalid credentials",
        });
      }
    });
};

export const registerUser = async ({
  email,
  password,
  name,
  navigate,
}: any) => {
  await nestAPI
    .post("/auth/register", {
      email,
      name,
      password,
    })
    .then(({ data }) => {
      store.dispatch(setUser(data));
      navigate("/invoices");
    });
};
