import ky from "ky";
import config from "../config.js";
import jwt from "jsonwebtoken";
import { type SteamVerifyResponse } from "../types.js";

export function signJwt(payload: object, expiresIn: string | number) {
   return jwt.sign(payload, config.privateKey, {
      algorithm: "RS256",
      expiresIn: expiresIn,
   });
}

export function verifyJwt(token: string) {
   try {
      const decoded = jwt.verify(token, config.publicKey);

      return {
         payload: decoded,
         expired: false,
      };
   } catch (error: any) {
      return {
         payload: null,
         expired: error.message.includes("jwt expired"),
      };
   }
}

export async function verifySteamToken(
   token: string,
   steamId: string
): Promise<SteamVerifyResponse> {
   try {
      const res = await ky.post("https://services.facepunch.com/sbox/auth/token", {
         json: {
            token: token,
            steamid: steamId,
         },
      });

      const verifyText = await res?.text();

      const values = verifyText
         .replaceAll("{", "")
         .replaceAll("}", "")
         .replaceAll('"', "")
         .replaceAll(":", ",")
         .split(",");

      if (values.length < 4 || !values[1] || !values[3]) {
         return {
            SteamId: steamId,
            Status: "invalid",
            Failed: true,
         };
      }

      const steamValidation: SteamVerifyResponse = {
         SteamId: values[1],
         Status: values[3],
      };

      steamValidation.Failed = steamValidation.Status === "invalid";

      return steamValidation;
   } catch (error: any) {
      console.error(error);

      return {
         SteamId: steamId,
         Status: "invalid",
         Failed: true,
      };
   }
}
