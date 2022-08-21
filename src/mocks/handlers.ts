import { ContractRemote } from "@models/types";
import { rest } from "msw";
import { addContract, getContractsDB } from "./mockDB";
import usersMock from "./__mocks__/users.json";

export const handlers = [
  rest.get("/contract", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword");
    if (keyword) {
      return res(
        ctx.status(200),
        ctx.json(
          getContractsDB().filter(
            (contract) =>
              contract.company.name.replaceAll(" ", "").toLowerCase() ===
              keyword.replaceAll(" ", "").toLowerCase()
          )
        )
      );
    }

    return res(ctx.status(200), ctx.json(getContractsDB()));
  }),

  rest.post("/contract", async (req, res, ctx) => {
    const body: ContractRemote = await req.json();
    addContract({
      id: `${getContractsDB().length + 1}`,
      company: body.company,
      contractor: body.contractor,
      timestamp: body.timestamp,
    });

    return res(ctx.status(200), ctx.text("success"));
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
