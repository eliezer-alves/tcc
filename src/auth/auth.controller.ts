import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new JWT.' })
  @ApiBody({ type: LogInDto })
  @ApiResponse({
    status: 201,
    description: 'Created.',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsaTI0QGVtYWlsZWxpLmNvbSIsInN1YiI6IjczOTU3OGYxLTg0MzctNGU0ZC1iODk0LTFiMDNjMTczNjJlZiIsImlhdCI6MTcwODMwMjUzOCwiZXhwIjoxNzA4MzA2MTM4fQ.5KaqoU5HdWbUWkq1CGXfeslSndktPdvDakDk9aSBH7Q',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
