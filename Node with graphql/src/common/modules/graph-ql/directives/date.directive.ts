import { defaultFieldResolver } from 'graphql';
import moment from 'moment';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export class DateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args: any) => {
      const result = await resolve.apply(this, args);

      let format: string = args.format || 'YYYY-MM-DD';
      if (result) {
        return moment(result).format(format);
      }
      return result;
    };
  }
}

export class DateTimeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args: any) => {
      const result = await resolve.apply(this, args);
      let format: string = args.format || 'YYYY-MM-DD HH:mm:ss';
      if (result) {
        return moment(result).format(format);
      }
      return result;
    };
  }
}
