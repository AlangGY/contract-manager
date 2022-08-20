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

  rest.post("/login", async (req, res, ctx) => {
    const { userName, password } = await req.json();
    if (!userName || password !== "1234") {
      return res(ctx.delay(1000), ctx.status(400, "failed to login"));
    }

    return res(ctx.delay(1000), ctx.status(200), ctx.json(usersMock[0]));
  }),
];
