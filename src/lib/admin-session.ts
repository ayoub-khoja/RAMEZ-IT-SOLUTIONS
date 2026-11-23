import { createHmac, timingSafeEqual } from "node:crypto";

/*
 * Session administrateur : un cookie signé (HMAC) valable 7 jours.
 * Variables nécessaires : ADMIN_PASSWORD et ADMIN_SESSION_SECRET.
 */

export const ADMIN_COOKIE = "ramez_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return secret;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET manquant ou trop court (16 caractères minimum).");
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined | null) {
  const secret = getSecret();
  if (!token || !secret) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

export function checkPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = createHmac("sha256", "compare").update(candidate).digest();
  const b = createHmac("sha256", "compare").update(password).digest();
  return timingSafeEqual(a, b);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret());
}
