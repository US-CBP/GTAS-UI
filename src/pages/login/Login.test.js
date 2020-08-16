// __tests__/fetch.test.js
import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { rest } from "msw";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
});

it("renders the login form elements", async () => {
  const { getByText, getByPlaceholderText } = render(<Login />);

  const username = getByPlaceholderText("Username");
  const password = getByPlaceholderText("Password");
  const forgotPwd = getByText("Forgot my password");
  const signUp = getByText("Sign Up");
  const login = getByText("LOGIN");

  expect(forgotPwd).toBeVisible();
  expect(signUp).toBeVisible();
  expect(username).toBeVisible();
  expect(password).toBeVisible();
  expect(login).toBeVisible();
});

// import Fetch from '../fetch'

// test('loads and displays greeting', async () => {
//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })

// test('handles server error', async () => {
//   server.use(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500))
//     })
//   )

//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('alert'))

//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
//   expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
// })
