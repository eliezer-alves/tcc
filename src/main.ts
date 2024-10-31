import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuração básica do Swagger
  const config = new DocumentBuilder()
    .setTitle('TCC')
    .setDescription('Load Test API')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document); // Altere o caminho aqui se quiser uma URL diferente, por exemplo, "docs"

  app.setGlobalPrefix('v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
