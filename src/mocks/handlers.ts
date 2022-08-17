import { rest } from "msw";
import contractsMock from "./__mocks__/contracts.json";

export const handlers = [
  rest.get("/contract", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contractsMock));
  }),
];
