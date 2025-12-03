import { SignJWT, jwtVerify } from 'jose';


export async function GenAccessToken(data) {
  const token = await new SignJWT({
    ...data,
    id: data.id.toString(), // ✅ Force string conversion
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
}


export async function JWTVerify(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload; // ✅ return entire payload
  } catch (error) {
    return null;
  }
}

