import { API_ENDPOINT } from "@constants/api.constant";
import { ContractRemote } from "@models/types";
import { rest } from "msw";
import {
  addContract,
  addUser,
  getContractsDB,
  getUsersDB,
  removeUserById,
} from "./mockDB";

export const handlers = [
  rest.get(`${API_ENDPOINT}/contract`, (req, res, ctx) => {
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

  rest.post(`${API_ENDPOINT}/contract`, async (req, res, ctx) => {
    const body: ContractRemote = await req.json();
    addContract({
      id: `${getContractsDB().length + 1}`,
      company: body.company,
      contractor: body.contractor,
      timestamp: body.timestamp,
    });

    return res(ctx.status(200), ctx.text("success"));
  }),

  rest.get(`${API_ENDPOINT}/user`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getUsersDB()));
  }),

  rest.post(`${API_ENDPOINT}/login`, async (req, res, ctx) => {
    const { userName, password } = await req.json();

    const users = getUsersDB();
    const loginUser = users.find((user) => user.name === userName);

    if (!loginUser) {
      return res(ctx.delay(1000), ctx.status(400, "failed to login"));
    }
    if (loginUser.password !== password) {
      return res(ctx.delay(1000), ctx.status(400, "failed to login"));
    }

    return res(ctx.delay(1000), ctx.status(200), ctx.json(loginUser));
  }),

  rest.post(`${API_ENDPOINT}/admin/user`, async (req, res, ctx) => {
    const { id } = await req.json();
    if (!id) return res(ctx.delay(1000), ctx.status(400, "no id received"));

    const userDB = getUsersDB();
    if (userDB.some((user) => user.id === id)) {
      return res(ctx.delay(1000), ctx.status(400, "userId exists"));
    }

    addUser({ id: id, name: id, isAdmin: false, password: "0000" });
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: "Success" })
    );
  }),

  rest.delete(`${API_ENDPOINT}/admin/user`, async (req, res, ctx) => {
    const id = req.url.searchParams.get("id");
    if (!id || !getUsersDB().some((user) => user.id === id)) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({ message: "invalid userId" })
      );
    }

    removeUserById(id);
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: "Success" })
    );
  }),

  rest.patch(`${API_ENDPOINT}/admin/user/password`, async (req, res, ctx) => {
    const { userId, password } = await req.json();
    const users = getUsersDB();
    const targetUser = users.find((user) => user.name === userId);
    if (!targetUser) {
      return res(
        ctx.delay(1000),
        ctx.status(400),
        ctx.json({ message: "invalid userId" })
      );
    }

    removeUserById(targetUser.id);
    addUser({ ...targetUser, password });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: "Success" })
    );
  }),
];
