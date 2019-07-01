import { agent, SuperAgent, SuperAgentRequest } from "supertest";
import { config } from "../config";
import { Account } from "../entity/Account";
import { passport } from "../middleware/auth";

import * as Koa from "koa";
import * as koaBody from "koa-bodyparser";
import * as Router from "koa-router";
import * as session from "koa-session";
import * as nock from "nock";
import * as auth_lib from "../lib/auth";

jest.mock("../entity/Account");

const ROUTE_URL = "google";
const router = new Router();

router.get(`/auth/${ROUTE_URL}/`, async (ctx: Koa.Context, next: any) => {
  if (!auth_lib.isAuthenticated(ctx)) {
    await passport.authenticate('google', {
      hd: "mst.edu",
      scope: ["openid", "email", "profile"],
    })(ctx, next);
  }
  else {
    ctx.redirect("/authenticated/");
  }
});

router.get(`/auth/${ROUTE_URL}/callback/`, async (ctx: Koa.Context, next: any) => {
  if (!auth_lib.isAuthenticated(ctx)) {
    await passport.authenticate("google", {
      failureRedirect: `/auth/${ROUTE_URL}/`,
      successRedirect: "/done/",
    })(ctx, next);
  } else {
    ctx.redirect("/authenticated/");
  }
});


const app = new Koa();
app.keys = ['test'];
app.use(koaBody());
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
app.use(router.allowedMethods());


const server = app.listen();
const CLIENT_ID = encodeURIComponent(config.GOOGLE_CLIENT_ID);
const CLIENT_SECRET = encodeURIComponent(config.GOOGLE_CLIENT_SECRET);
const CODE = "test";
const URI_SAFE_CODE = encodeURIComponent(CODE);

async function login_user(request: SuperAgent<SuperAgentRequest>) {
  const response = await request.get(`/auth/${ROUTE_URL}/callback/`)
    .query({code: CODE,
           scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
           hd: 'mst.edu',
           prompt: 'none' });
  expect(response.status).toEqual(302);
  expect(response.header.location).toEqual("/done/");
  /**
   * https://github.com/facebook/jest/issues/2549
   * https://medium.com/@internetross/a-pattern-for-creating-authenticated-sessions-for-routing-specs-with-supertest-and-jest-until-the-baf14d498e9d
   */
  const cookie = response.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
  request.jar.setCookies(cookie);
}

async function verify_login_redirect(request: SuperAgent<SuperAgentRequest>, redirect: string | RegExp) {
  const response = await request.get(`/auth/${ROUTE_URL}/callback/`);
  expect(response.status).toEqual(302);
  expect(response.header.location).toEqual(expect.stringMatching(redirect));
}

describe("MIDDLEWARE auth", () => {
  let request;
  beforeEach(async (done) => {
    nock('https://www.googleapis.com:443', {"encodedQueryParams": true})
      .post('/oauth2/v4/token', `grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback%2F&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${URI_SAFE_CODE}`)
      .reply(200, {"access_token": "test", "expires_in": 3599, "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email", "token_type": "Bearer", "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0MWZjMDUzZWY2OGExNDdkNmUwODQ1YWI2OWI5ZDYxYWE0YmM3ODkifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NTcyNjg2MzExMDMtNG1rb2dtMmVmcDU3bnVjcTVxOWVvdjBkMXY2bzVkdHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NTcyNjg2MzExMDMtNG1rb2dtMmVmcDU3bnVjcTVxOWVvdjBkMXY2bzVkdHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU2NTg2MTAyNzkwMTgzODQzOTciLCJoZCI6Im1zdC5lZHUiLCJlbWFpbCI6ImtzeWgzQG1zdC5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImtqSHEzaEpCOTU5UTg4bnpjQWNSSUEiLCJuYW1lIjoiS2V2aW4gU2Nob29ub3ZlciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTZxMjQ0NFh1cUJRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FBTjMxRFZPVnRUeVl3ZUVHTUw3U3ZrekVnVTFGMG85emcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IktldmluIiwiZmFtaWx5X25hbWUiOiJTY2hvb25vdmVyIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1Mzg4NjgyNjksImV4cCI6MTUzODg3MTg2OX0.borw1IX7FPUmfsmzdDUIkJ9-0xHVYcJ0-RYDDyWmohJEVq2Aj8V6BXlzowPgDJQ5B-Z6uCGRNFSIxxB4N5Xx30T_97OGR_ANTLz5gOqyyDWAFXwNlmIVhnN-Nz50zOpNfga3xKPk4AR2s04JI1rHPkQVJWF64CCaXrC142iFWlExwWFczHDzV8qRTnmKfkT1-QHxmlJVeUTLxWVsoscZCrj0LUV4XZo_vgYUDt90_0IfYtkDSsKEgJoB66REMErFWdbqdf3qVVD1KFteW9KxBa0p0tGIcc1UQhMrT6U8_IOUzcEn3w8DX4a5-39XjCUeVN9wCn_QVu83DbSbKs0hDA"});

    nock('https://www.googleapis.com:443', {"encodedQueryParams": true})
      .get('/oauth2/v3/userinfo')
      .query({"access_token":  "test"})
      .reply(200, {"sub": "105658610279018384397", "name": "Kevin Schoonover", "given_name": "Kevin", "family_name": "Schoonover", "profile": "https://plus.google.com/105658610279018384397", "picture": "https://lh3.googleusercontent.com/-6q2444XuqBQ/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DVOVtTyYweEGML7SvkzEgU1F0o9zg/mo/photo.jpg", "email": "ksyh3@mst.edu", "email_verified": true, "locale": "en", "hd": "mst.edu"});
    request = agent(server);
    done();
  });
  afterEach(async () => {
    nock.cleanAll();
    jest.clearAllMocks();
    await server.close();
  });

  describe("Valid authentication", async () => {
    it("should login user if user exists in database", async (done) => {
      Account.mockImplementation(() => {
        return {
          save: () => {},
        };
      });
      Account.findOne = jest.fn()
        .mockReturnValue({id: "test", firstName: "Kevin", lastName: "Schoonover", email: "ksyh3@mst.ed"});
      await login_user(request);
      await verify_login_redirect(request, "/authenticated/");
      done();
    });

    it("should login user if user does not exist in database", async (done) => {
      let user;
      Account.mockImplementation(() => {
        return {
          save() {
            this.id = "test";
            user = this;
          },
        };
      });
      Account.findOne = jest.fn()
        .mockReturnValueOnce(undefined)
        .mockReturnValue({"id": "test"});

      await login_user(request);
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
      expect(user.email).toBeDefined();
      await verify_login_redirect(request, "/authenticated/");
      done();
    });
  });

  describe("Invalid authentication", async () => {
    it("should fail to reauthenticate if deserialization fails", async (done) => {
      let user;
      Account.mockImplementation(() => {
        return {
          save() {
            this.id = "test";
            user = this;
          },
        };
      });
      Account.findOne = jest.fn().mockReturnValue(undefined);

      await login_user(request);
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
      expect(user.email).toBeDefined();
      await verify_login_redirect(
        request, /^https:\/\/accounts.google.com\/o\/oauth2\/v2\/.+/
      );
      done();
    });

    it("should fail if error occurs during authentication", async (done) => {
      let user;
      Account.mockImplementation(() => {
        return {
          save() {
            throw new Error("Test error");
          },
        };
      });
      Account.findOne = jest.fn().mockReturnValue(undefined);

      const response = await request.get(`/auth/${ROUTE_URL}/callback/`)
        .query({code: CODE,
           scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
           hd: 'mst.edu',
           prompt: 'none' });
      expect(response.status).toEqual(500);
      done();
    });
  });
});
