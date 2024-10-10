import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
constructor( private readonly userService: UserService) {}

    @Get('profile')
    @Auth()
    async profile(@CurrentUser('id') id: string) {
        return this.userService.getProfile(id)
    }

    @Auth()
    @Get('profile/statistics')
    async getProfileStatistics(@CurrentUser('id') id: string) {
        return this.userService.getProfileWithStatistics(id);
    }

    @Auth()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put('update')
    async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto ){
        return this.userService.update(id, dto)
    }
}
