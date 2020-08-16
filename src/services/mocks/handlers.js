import { rest } from "msw";
import * as URL from "../svcConstants.js";

export const handlers = [
  rest.post(URL.LOGIN, (req, res, ctx) => {
    console.log("MOCK LOGIN");

    sessionStorage.setItem("is-authenticated", true);
    return res(ctx.status(200));
  }),

  rest.get(URL.LOGGEDIN_USER, (req, res, ctx) => {
    console.log("MOCK LOGGEDIN_USER");

    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized"
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        userId: "MOCK USER",
        firstName: "Mock",
        lastName: "User",
        active: 1,
        roles: [{ roleId: 1, roleDescription: "Admin" }],
        email: "user@mock.com",
        emailEnabled: false,
        highPriorityEmail: false,
        archived: false
      })
    );
  }),

  rest.get(URL.FLIGHTS, (req, res, ctx) => {
    console.log("MOCK FLIGHTS");

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 4,
          fullFlightNumber: "UA0988",
          origin: "FRA",
          destination: "IAD",
          direction: "I",
          etd: 1597414800000,
          eta: 1597446300000,
          countdown: "2020-08-14 23:05",
          passengerCount: 192,
          ruleHitCount: 0,
          listHitCount: null,
          graphHitCount: null,
          fuzzyHitCount: null
        },
        {
          id: 3,
          fullFlightNumber: "UA0127",
          origin: "DUB",
          destination: "IAD",
          direction: "I",
          etd: 1597418700000,
          eta: 1597447200000,
          countdown: "2020-08-14 23:20",
          passengerCount: 25,
          ruleHitCount: 0,
          listHitCount: null,
          graphHitCount: null,
          fuzzyHitCount: null
        },
        {
          id: 6,
          fullFlightNumber: "SU2682",
          origin: "SVO",
          destination: "RIX",
          direction: "A",
          etd: 1597486500000,
          eta: 1597492200000,
          countdown: "2020-08-15 14:50",
          passengerCount: 200,
          ruleHitCount: 0,
          listHitCount: null,
          graphHitCount: null,
          fuzzyHitCount: null
        },
        {
          id: 5,
          fullFlightNumber: "UA0988",
          origin: "FRA",
          destination: "IAD",
          direction: "I",
          etd: 1597501200000,
          eta: 1597532700000,
          countdown: "2020-08-15 23:05",
          passengerCount: 192,
          ruleHitCount: 0,
          listHitCount: null,
          graphHitCount: null,
          fuzzyHitCount: null
        }
      ])
    );
  }),

  rest.get(`${URL.FLIGHTPAX}/:id`, (req, res, ctx) => {
    console.log("MOCK FLIGHTPAX");

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 401,
          firstName: "ELLIOT",
          middleName: "JUDE",
          lastName: "FEWTRELL",
          gender: "M",
          nationality: "ERI",
          passengerType: "P",
          dob: 51595200000,
          seat: null,
          onRuleHitList: false,
          onWatchList: false,
          documents: ["770052247"]
        },
        {
          id: 402,
          firstName: "CHARLES",
          middleName: "MICHAEL",
          lastName: "GOODACRE",
          gender: "M",
          nationality: "USA",
          passengerType: "P",
          dob: 661237200000,
          seat: null,
          onRuleHitList: false,
          onWatchList: false,
          documents: ["94454359"]
        },
        {
          id: 403,
          firstName: "MITCHELL",
          middleName: "EDDIE",
          lastName: "GREIG",
          gender: "M",
          nationality: "USA",
          passengerType: "P",
          dob: 621662400000,
          seat: null,
          onRuleHitList: false,
          onWatchList: false,
          documents: ["92583332"]
        },
        {
          id: 404,
          firstName: "STACY",
          middleName: "FERNANDO",
          lastName: "TRENT",
          gender: "M",
          nationality: "USA",
          passengerType: "P",
          dob: 10555200000,
          seat: null,
          onRuleHitList: false,
          onWatchList: false,
          documents: ["447300102"]
        }
      ])
    );
  })
];
