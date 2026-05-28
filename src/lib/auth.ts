import crypto from "crypto";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "aesthetix-labs-secret-signature-key-2026-dynamic-token";

export function signJwt(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify({ 
    ...payload, 
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days expiration
  })).toString("base64url");
  
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(signatureInput).digest("base64url");
  
  return `${signatureInput}.${signature}`;
}

export function verifyJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [encodedHeader, encodedPayload, signature] = parts;
    
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto.createHmac("sha256", JWT_SECRET).update(signatureInput).digest("base64url");
    
    if (signature !== expectedSignature) return null;
    
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    
    // Check expiration
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}

export function hashPassword(password: string): string {
  const salt = "aesthetix-labs-dermal-salt-10892";
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

// Helper to get authenticated user from request context
export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) return null;
    
    const decoded = verifyJwt(token);
    if (!decoded) return null;
    
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      isAdmin: decoded.isAdmin || false
    };
  } catch (error) {
    return null;
  }
}
