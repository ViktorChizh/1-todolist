import React, { FC, memo, useEffect } from "react";
import "./App.css";
import ButtonAppBar from "../features/buttonAppBar/ButtonAppBar";
import { PageTodoLists } from "../features/pageTodolists/PageTodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackBar } from "../components/errorSnackBar/ErrorSnackBar";
import { useAppDispatch, useAppSelector } from "./Store";
import { CircularProgress, Container } from "@mui/material";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login/Login";
import { meTC } from "../auth/authReducer";
import { Error404 } from "../components/error404/Error404";

type AppPropsType = {
  demo?: boolean;
};

export const App: FC<AppPropsType> = memo(({ demo = false }) => {
  const status = useAppSelector((state) => state.app.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(meTC());
  }, []);
  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="App">
        <ButtonAppBar />
        {status === "loading" && <LinearProgress color="error" />}
        <Container
          fixed
          style={{ margin: "0", padding: "0", width: "100%", maxWidth: "100%" }}
        >
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route
              path={"/1-todolist"}
              element={<Navigate to={"/todolists"} />}
            />
            <Route path={"/"} element={<Navigate to={"/todolists"} />} />
            <Route
              path={"/todolists"}
              element={<PageTodoLists demo={demo} />}
            />
            <Route path={"/error404"} element={<Error404 />} />
            <Route path={"*"} element={<Navigate to={"/error404"} />} />
          </Routes>
        </Container>
        <ErrorSnackBar />
      </div>
    </HashRouter>
  );
});
