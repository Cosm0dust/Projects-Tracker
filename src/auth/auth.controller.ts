import { Body, Res, Controller, HttpCode, Post, UsePipes, ValidationPipe, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {Response as ExpressResponse, Request as ExpressRequest} from 'express'


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: ExpressResponse){
        const {refreshToken, ...response} = await this.authService.login(dto)
        this.authService.addRefreshTokenToResponse(res, refreshToken)
        return response
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: AuthDto, @Res({passthrough: true}) res: ExpressResponse){
        const {refreshToken, ...response} = await this.authService.register(dto)
        this.authService.addRefreshTokenToResponse(res, refreshToken)
        return response
    }

    
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(
        @Req() req: ExpressRequest,
        @Res({passthrough: true}) res: ExpressResponse
    ) {
        
        const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME];
        
        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenFromResponse(res);
            throw new UnauthorizedException('Refresh token not passed');
        }

        const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies);
        return response;
    }
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('logout')
    async logout(@Res({passthrough: true}) res: ExpressResponse){
        this.authService.removeRefreshTokenFromResponse(res)
        return true
    }

}
