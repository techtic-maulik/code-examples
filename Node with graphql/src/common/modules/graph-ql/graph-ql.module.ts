import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import * as GraphQLJSON from 'graphql-type-json';
import { Directives } from './directives';
import { jwtConstants } from '../auth';
import { JwtPayload } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [join(process.cwd(), 'server/', '**/*.graphql')],
      definitions: {
        path: join(process.cwd(), 'server/src/graphql.ts'),
        outputAs: 'class',
      },
      context: async (data) => {
        let { req, context, connection } = data
        if (connection) {
          let ctx = connection.context
          const jwtToken = ctx.authToken;
          let data = jwt.verify(jwtToken, jwtConstants.secret) as JwtPayload;
          return { ...connection, context: { ...context, user: data, jwtToken } };
        }

        let jwtToken = req.headers['authorization'];
        return {
          ...context,
          req,
          headers: req ? req.headers : {},
          jwtToken,
        };
      },
      installSubscriptionHandlers: true,
      schemaDirectives: Directives,
      introspection: true,
      resolvers: { JSON: GraphQLJSON },
      debug: true,
      playground: true,
      subscriptions: {
        onConnect: async (connection: any) => {
          const jwtToken = connection.authToken;
          if (jwtToken) {
            try {
              let data = jwt.verify(jwtToken, jwtConstants.secret) as JwtPayload;
              return { ...connection, user: data };
            } catch (error) {
              throw new UnauthorizedException("Unauthorized", "User not authorized to connect.");
            }
          } else {
            throw new AuthenticationError('authToken must be provided');
          }
        }
      }
    }),
  ],
})
export class GraphQlModule { }
