import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // return user.userId as string;
    // console.log('Request:', request);
    // console.log('User:', request?.user);
    return request?.user?.user_id;
  },
);
