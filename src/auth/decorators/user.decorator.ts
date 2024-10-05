import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { create } from "domain";
import { User } from "../../user/user.entity";

export const CurrentUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user

        return data ? user[data] : user
    }
)