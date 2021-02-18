import { createParamDecorator } from "@nestjs/common";

export * from "./auth.guard";
export * from "./auth.module";
export * from "./auth.service";
export * from "./constants";
export * from "./jwt.strategy";


export const authenticated = next => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error(`Unauthenticated!`);
    }

    return next(root, args, context, info);
};


export const CurrentUser = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.req.user,
);

export const JwtToken = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.jwtToken,
);