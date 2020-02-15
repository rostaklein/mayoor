import * as jwt from 'jsonwebtoken';
import { UserContext, UserDetails } from './context';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export const issueToken = (userDetails: UserDetails): string => {
  if (!process.env.CLIENT_SECRET) {
    throw new Error('No client secret provided in ENV.');
  }
  return jwt.sign(userDetails, process.env.CLIENT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};

const getCurrentUserByToken = (token: string | undefined) =>
  new Promise<UserDetails>((resolve, reject) => {
    if (!process.env.CLIENT_SECRET) {
      throw new Error('No client secret provided in ENV.');
    }
    if (!token) {
      throw new Error('No token provided');
    }
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }

      const userDetails = decoded as UserDetails;
      resolve(userDetails);
    });
  });

export const getUserContext = (
  contextParameters: ExpressContext,
): UserContext => {
  const { req } = contextParameters;
  const token = req.headers.authorization?.replace('Bearer ', '');

  return { getCurrentUser: () => getCurrentUserByToken(token) };
};
