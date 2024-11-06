import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  Res,
  HttpStatus,
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
import { Response } from 'express';

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
  async create(@Body() data: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.create(data);
      const userId = user.id;
      res.setHeader('Location', `/users/${userId}`);
      return res.status(HttpStatus.CREATED).send();
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || 'Failed to create user',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
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
  async showProfile(@Request() req: any, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(req.user.userId);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to retrieve user profile',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to retrieve user',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
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
  async search(@Param('term') term: string, @Res() res: Response) {
    try {
      const users = await this.userService.search(term);
      if (!users || users.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'No users found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to search users',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  @ApiOperation({ summary: 'Get total number of users.' })
  @ApiResponse({
    status: 200,
    description: 'OK.',
    schema: {
      example: { totalUsers: 100 },
    },
  })
  @Get('data/count')
  async countUsers(@Res() res: Response) {
    try {
      const totalUsers = await this.userService.countUsers();
      return res.status(HttpStatus.OK).json(totalUsers);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Failed to get user count',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
