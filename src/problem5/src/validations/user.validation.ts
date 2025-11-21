// Validation helpers
interface ValidationError {
  field: string;
  message: string;
}

export const validateId = (
  id: string
): { valid: boolean; value?: number; error?: string } => {
  const numId = parseInt(id, 10);
  if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
    return { valid: false, error: "ID must be a positive integer" };
  }
  return { valid: true, value: numId };
};

export const validateUserCreate = (
  body: any
): { valid: boolean; errors?: ValidationError[] } => {
  const errors: ValidationError[] = [];

  const nameValidation = validateName(body.name);
  if (!nameValidation.valid) {
    errors.push({ field: "name", message: nameValidation.error! });
  }

  if (body.description !== undefined) {
    const descValidation = validateDescription(body.description);
    if (!descValidation.valid) {
      errors.push({ field: "description", message: descValidation.error! });
    }
  }

  // Check for unexpected fields
  const allowedFields = ["name", "description"];
  const bodyKeys = Object.keys(body);
  const unexpectedFields = bodyKeys.filter(
    (key) => !allowedFields.includes(key)
  );
  if (unexpectedFields.length > 0) {
    errors.push({
      field: "body",
      message: `Unexpected fields: ${unexpectedFields.join(", ")}`,
    });
  }

  return errors.length > 0 ? { valid: false, errors } : { valid: true };
};

export const validateUserUpdate = (
  body: any
): { valid: boolean; errors?: ValidationError[] } => {
  const errors: ValidationError[] = [];

  // Name is optional in update, but if provided, must be valid
  if (body.name !== undefined) {
    const nameValidation = validateName(body.name);
    if (!nameValidation.valid) {
      errors.push({ field: "name", message: nameValidation.error! });
    }
  }

  // Description is optional in update, but if provided, must be valid
  if (body.description !== undefined) {
    const descValidation = validateDescription(body.description);
    if (!descValidation.valid) {
      errors.push({ field: "description", message: descValidation.error! });
    }
  }

  // Check for unexpected fields
  const allowedFields = ["name", "description"];
  const bodyKeys = Object.keys(body);
  const unexpectedFields = bodyKeys.filter(
    (key) => !allowedFields.includes(key)
  );
  if (unexpectedFields.length > 0) {
    errors.push({
      field: "body",
      message: `Unexpected fields: ${unexpectedFields.join(", ")}`,
    });
  }

  // At least one field must be provided for update
  if (bodyKeys.length === 0) {
    errors.push({
      field: "body",
      message: "At least one field (name or description) must be provided",
    });
  }

  return errors.length > 0 ? { valid: false, errors } : { valid: true };
};

export const validateQueryParams = (
  query: any
): {
  valid: boolean;
  q?: string;
  limit?: number;
  offset?: number;
  errors?: ValidationError[];
} => {
  const errors: ValidationError[] = [];
  let q: string | undefined;
  let limit: number | undefined;
  let offset: number | undefined;

  if (query.q !== undefined) {
    if (typeof query.q !== "string") {
      errors.push({
        field: "q",
        message: "Query parameter 'q' must be a string",
      });
    } else {
      q = query.q;
    }
  }

  if (query.limit !== undefined) {
    const limitNum = parseInt(query.limit as string, 10);
    if (isNaN(limitNum) || limitNum <= 0 || !Number.isInteger(limitNum)) {
      errors.push({
        field: "limit",
        message: "Query parameter 'limit' must be a positive integer",
      });
    } else {
      limit = limitNum;
    }
  }

  if (query.offset !== undefined) {
    const offsetNum = parseInt(query.offset as string, 10);
    if (isNaN(offsetNum) || offsetNum < 0 || !Number.isInteger(offsetNum)) {
      errors.push({
        field: "offset",
        message: "Query parameter 'offset' must be a non-negative integer",
      });
    } else {
      offset = offsetNum;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, q, limit, offset };
};

const validateName = (name: any): { valid: boolean; error?: string } => {
  if (name === undefined || name === null) {
    return { valid: false, error: "Name is required" };
  }
  if (typeof name !== "string") {
    return { valid: false, error: "Name must be a string" };
  }
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Name cannot be empty" };
  }
  if (trimmed.length > 200) {
    return { valid: false, error: "Name cannot exceed 200 characters" };
  }
  return { valid: true };
};

const validateDescription = (
  description: any
): { valid: boolean; error?: string } => {
  if (description === undefined || description === null) {
    return { valid: false, error: "Description is required" };
  }

  if (typeof description !== "string") {
    return { valid: false, error: "Description must be a string" };
  }
  if (description.trim().length === 0) {
    return { valid: false, error: "Description cannot be empty" };
  }
  return { valid: true };
};
