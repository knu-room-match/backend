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
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UserSwaggerDocs.findById()
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  @UserSwaggerDocs.createUser()
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
