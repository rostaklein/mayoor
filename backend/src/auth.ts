import * as jwt from 'jsonwebtoken';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { UserContext, UserDetails } from './context';

export const issueToken = (userDetails: UserDetails): string => {
  if (!process.env.CLIENT_SECRET) {
    throw new Error('No client secret provided in ENV.');
  }
  return jwt.sign(userDetails, process.env.CLIENT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};

const verifyToken = (token: string) =>
  new Promise<UserDetails>((resolve, reject) => {
    if (!process.env.CLIENT_SECRET) {
      throw new Error('No client secret provided in ENV.');
    }
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }

      const userDetails = decoded as UserDetails;
      resolve(userDetails);
    });
  });

const getCurrentUserByToken = async (token: string): Promise<UserDetails> => {
  try {
    return await verifyToken(token);
  } catch (err) {
    console.error(err);
    throw new Error('You must be logged in to do this');
  }
};

export const getUserContext = (
  contextParameters: ContextParameters,
): UserContext => {
  const { request } = contextParameters;
  const token = request.headers.authorization;

  if (!token) {
    throw new Error('No token provided');
  }

  return { getCurrentUser: () => getCurrentUserByToken(token) };
};
