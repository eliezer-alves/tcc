import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IUserRepository } from '../repositories';

@ValidatorConstraint({ async: true })
export class IsEmailNotRegistered implements ValidatorConstraintInterface {
  constructor(private readonly usersRepository: IUserRepository) {}

  validate(email: any) {
    if (!email || typeof email !== 'string') return false;
    return this.usersRepository.findUniqueByEmail(email).then((user) => {
      return user === null;
    });
  }
}

export function EmailNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegistered,
    });
  };
}
