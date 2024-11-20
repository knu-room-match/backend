import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user-request.dto';
import { User } from '../entities/user.entity';
import { UserSwaggerDocs } from '../decorator/user-swagger.decorator';

@ApiTags('Users') // Swagger에서 API 그룹 이름
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UserSwaggerDocs.findAll()
  async findAll() {
    const user = await this.userService.findAll();
    return {
      statusCode: 301,
      data: user,
    };
  }

  @Get(':id')
  @UserSwaggerDocs.findById()
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  @UserSwaggerDocs.createUser()
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
