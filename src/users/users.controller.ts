import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { dataUserResponseExample } from './dto/show-user.dto';
import { JwtAuthGuard } from '../auth/guards';
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from 'src/shared/response.examples';

@ApiTags('Users')
@ApiResponse(INTERNAL_SERVER_ERROR)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create new user.' })
  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: {
      example: dataUserResponseExample,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        message: ['email already registered'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post('create')
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @ApiOperation({ summary: 'Data of current logged user.' })
  @ApiResponse({
    status: 200,
    description: 'OK.',
    schema: {
      example: dataUserResponseExample,
    },
  })
  @ApiResponse(UNAUTHORIZED)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  showProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @ApiOperation({ summary: 'Get user by ID.' })
  @ApiResponse({
    status: 200,
    description: 'OK.',
    schema: {
      example: dataUserResponseExample,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Search users by term.' })
  @ApiResponse({
    status: 200,
    description: 'OK.',
    schema: {
      example: [dataUserResponseExample],
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
    schema: {
      example: {
        message: 'No users found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Get('search/:term')
  async search(@Param('term') term: string) {
    return this.userService.search(term);
  }
}
