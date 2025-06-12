import type {  ValidationErrors,  ZodParseResponse,} from 'context/index';
import { z, ZodEffects, ZodObject, type ZodRawShape, type ZodTypeAny } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const zodParse = async <Schema extends z.ZodTypeAny, Input extends Record<any, any>>(
  schema: Schema,
  input: Input,
): Promise<ZodParseResponse<z.infer<Schema>>> => {
  try {
    const result = await schema.safeParseAsync(input);

    if (!result.success) {
      const { details } = fromZodError(result.error);

      const validationError: ValidationErrors = details.map(item => ({
        value: {
          path: item.path.join('.'),
          message: item.message,
        },
      }));

      return { validationError, result: null };
    }

    return { validationError: null, result: result.data };
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
};

export const getSchemaKeys = (schema: ZodObject<ZodRawShape>, parentKey = ''): string[] => {
  return Object.entries(schema.shape).flatMap(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof z.ZodObject) {
      return [fullKey, ...getSchemaKeys(value, fullKey)];
    }
    return fullKey;
  });
};

export const unwrapSchema = (schema: ZodTypeAny): ZodObject<ZodRawShape> => {
  if (schema instanceof ZodEffects) {
    return unwrapSchema(schema._def.schema);
  }
  if (schema instanceof ZodObject) {
    return schema;
  }
  throw new Error('Schema is not a ZodObject');
};

export const findValidationErrors = (validationErrors: ValidationErrors, paths: string[]) => {
  const newValidationErrors: Record<string, any> = {};

  const setNestedValue = (obj: any, path: string, value: string) => {
    const keys = path.split('.');
    let current = obj;

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;

      if (isLast) {
        current[key] = value;
      } else {
        if (!current[key]) {
          current[key] = isNaN(Number(keys[index + 1])) ? {} : [];
        }
        current = current[key];
      }
    });
  };

  for (const valError of validationErrors) {
    const { path } = valError.value;

    if (paths.includes(path) || paths.some(p => path.startsWith(`${p}.`))) {
      setNestedValue(newValidationErrors, path, valError.value.message);
    }
  }

  return newValidationErrors;
};

export const validateData = async <Schema extends ZodTypeAny>({ schema, data }: { schema: Schema; data: any }) => {
  let issues = null;
  let isError = false;

  const parsedResult = await zodParse(schema, data);
  const { validationError } = parsedResult;

  if (validationError !== null) {
    const paths = getSchemaKeys(unwrapSchema(schema));
    issues = findValidationErrors(validationError, paths);
    isError = true;
  }
  return { issues: issues, isError: isError };
};

export const getUniqueValues = (arr: any[]) => {
  let unique = arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return unique;
};

export const sortAlphabetically = (arr: string[]) => {
  const sortedNames = arr.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else return 0;
  });
  return sortedNames;
};




