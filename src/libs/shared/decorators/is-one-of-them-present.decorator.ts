import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsOneOfThemPresent(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isOneOfThemPresent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedProperties = args.constraints;
          return relatedProperties.some(
            (prop) =>
              (args.object as any)[prop] !== null &&
              (args.object as any)[prop] !== undefined,
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `At least one of [${args.constraints.join(', ')}] should be provided.`;
        },
      },
    });
  };
}
