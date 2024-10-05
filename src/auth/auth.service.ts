import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import {Response as ExpressResponse} from 'express'


@Injectable()
export class AuthService {
    EXPIRE_DATE_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private configService: ConfigService
    ) {}

    

    async register(dto: AuthDto) {
        const oldUser = await this.userService.getByEmail(dto.email)

        if(oldUser) throw new BadRequestException('User already exists')
        
        const {password, ...user} = await this.userService.create(dto)

        const tokens = this.issueTokens(user.id)

        return {user, ...tokens}
    }

    async login(dto: AuthDto){
        const {password, ...user} = await this.validateUser(dto)
        const tokens = this.issueTokens(user.id)

        return {user, ...tokens}
    }

    private issueTokens(userId){
        const data = {id: userId}

        const accessToken = this.jwtService.sign(data, {
            expiresIn: '1h'
        })

        const refreshToken = this.jwtService.sign(data, {
            expiresIn: '7d'
        })

        return {accessToken, refreshToken}
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.getByEmail(dto.email)

        if(!user) throw new NotFoundException('User not found')

        const isValid = await verify(user.password, dto.password)

        if(!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }

    private setCookie(res: ExpressResponse, token: string, expires: Date) {
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        res.cookie(this.REFRESH_TOKEN_NAME, token, {
            httpOnly: true,
            domain: this.configService.get<string>('DOMAIN', 'localhost'),
            expires: expires,
            secure: isProduction, 
            sameSite: isProduction ? 'lax' : 'none' 
        });
    }

    addRefreshTokenToResponse(res: ExpressResponse, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DATE_REFRESH_TOKEN);

        this.setCookie(res, refreshToken, expiresIn);
    }

    removeRefreshTokenFromResponse(res: ExpressResponse) {
        this.setCookie(res, '', new Date(0));
    }

    async getNewTokens(refreshToken: string){
        const result = await this.jwtService.verifyAsync(refreshToken)
        if(!result) throw new UnauthorizedException('Invalid refresh token')
        
        const {password, ...user} = await this.userService.getById(result.id)
        
        const tokens = this.issueTokens(user.id)

        return {
            user,
            ...tokens
        }
    }
}
