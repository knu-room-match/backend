import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user-request.dto';
import { UserSwaggerDocs } from '../decorator/user-swagger.decorator';
import { ResponseEntity } from '@common/dto/response-entity.dto';
import { USER_MESSAGES } from '@common/constants/user.constants'; // Import the constants

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UserSwaggerDocs.findAll()
  async findAll() {
    const users = await this.userService.findAll();
    return ResponseEntity.success(users, USER_MESSAGES.SUCCESS.USERS_FOUND);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UserSwaggerDocs.findById()
  async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return ResponseEntity.success(user, USER_MESSAGES.SUCCESS.USER_FOUND);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UserSwaggerDocs.createUser()
  async createUser(@Body() createUserDto: CreateUserDTO) {
    const user = await this.userService.create(createUserDto);
    return ResponseEntity.success(user, USER_MESSAGES.SUCCESS.USER_CREATED);
  }
}
