import { rest } from "msw";
import contractsMock from "./__mocks__/contracts.json";
import usersMock from "./__mocks__/users.json";
export const handlers = [
  rest.get("/contract", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contractsMock));
  }),

  rest.get("/user", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersMock));
  }),
];
