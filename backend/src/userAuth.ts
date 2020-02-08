import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { ContextParameters } from 'graphql-yoga/dist/types';

const client = jwksClient({
  jwksUri: `https://rostaklein.eu.auth0.com/.well-known/jwks.json`,
});

const getKey: jwt.GetPublicKeyOrSecret = (header, cb) => {
  if (!header.kid) {
    throw new Error('Problem with header.kid');
  }
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    cb(null, signingKey);
  });
};

const options: jwt.VerifyOptions = {
  audience: 'kralovskytisk',
  issuer: `https://rostaklein.eu.auth0.com/`,
  algorithms: ['RS256'],
};

type UserDetails = {
  id: string;
  email: string;
};

export type UserContext = {
  getCurrentUser: () => Promise<UserDetails>;
};

export const getUserContext = (
  contextParameters: ContextParameters,
): UserContext => {
  const { request } = contextParameters;
  const token = request.headers.authorization;

  const getCurrentUser = async (): Promise<UserDetails> => {
    if (!token) {
      throw new Error('No token provided');
    }
    const getUserDetails = new Promise<UserDetails>((resolve, reject) => {
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err || !decoded) {
          return reject(err);
        }

        const userDetails = decoded as UserDetails;
        resolve(userDetails);
      });
    });

    try {
      return await getUserDetails;
    } catch (err) {
      console.error(err);
      throw new Error('You must be logged in to do this');
    }
  };

  return { getCurrentUser };
};
