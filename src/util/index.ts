import ky from "ky";
import config from "../config";
import jwt from "jsonwebtoken";

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

export async function verifySteamToken(token: string, steamId: string) {
   try {
      const res = await ky.post("https://services.facepunch.com/sbox/auth/token", {
         json: {
            token: token,
            steamid: steamId,
         },
      });

      return res;
   } catch (error: any) {}
}
