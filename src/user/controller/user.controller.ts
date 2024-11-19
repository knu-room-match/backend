import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user-request.dto';
import { User } from '../entities/user.entity';

@ApiTags('Users') // Swagger에서 API 그룹 이름
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회', description: '저장된 모든 사용자를 조회합니다.' })
  @ApiResponse({
    status: 200,
    description: '사용자 목록 조회 성공',
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 사용자 조회', description: 'ID로 특정 사용자를 조회합니다.' })
  @ApiResponse({
    status: 200,
    description: '사용자 조회 성공',
    type: User,
  })
  @ApiParam({ name: 'id', description: '사용자 ID', example: 1 })
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성', description: '새로운 사용자를 생성합니다.' })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    type: User,
  })
  @ApiBody({
    description: '생성할 사용자 정보',
    type: CreateUserDTO,
  })
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
