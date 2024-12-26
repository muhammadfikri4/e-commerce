export const MESSAGES = {
  CREATED: {
    USER: {
      ACCOUNT: "User created successfully",
      INITIAL: "Initial user created successfully",
    },
    CUSTOMER: "Customer created successfully",
    CATEGORY: "Category created successfully",
    PRODUCT: "Product created successfully",
    ADDRESS: "Address created successfully",
  },
  ERROR: {
    NOT_FOUND: {
      USER: {
        ACCOUNT: "User not found",
        FCM: "FCM Token not found",
        FCM_USER: "FCM User not found",
      },
      ANGKATAN: {
        ID: "Angkatan ID not found",
        NAME: "Angkatan not found",
      },
      ROLE: "Role not found",
      DEPARTMENT: "Department not found",
      ROUTE: "Route not found, check again your endpoint",
      CATEGORY: "Category not found",
      PRODUCT: "Product not found",
    },
    ALREADY: {
      GLOBAL: {
        EMAIL: "Email is already exist",
        NIM: "NIM is already exist",
        PHONE_NUMBER: "Phone number is already exist",
      },
      USER: "User already exist",
      CATEGORY: "Category already exist",
      PRODUCT: "Product already exist",
      PAYMENT_METHOD: "Payment method already exist",
    },
    INVALID: {
      GLOBAL: {
        EMAIL: "Email is invalid",
      },
      USER: {
        PASSWORD: "Password is wrong",
        PASSWORD_LENGTH: "Password must be at least 8 characters",
      },
      ID: "ID is invalid",
      ROLE_ADMIN: "Admin can't register in this app",
      TOKEN: "Token is invalid",
      INITIAL: "Initial can only be run 1 time",
      CODE: "Code is invalid",
      IMAGE_SIZE: "Image size must be less then 5mb",
      FILE_TYPE: "File type must be png, jpg, jpeg",
      UPLOAD_FILE: "Failed to upload file",
      DOUBLE_PRIMARY_ADDRESS: `Can't add double primary address`,
    },
    UNAUTHORIZED: {
      AUTH: "If you are not logged in, please log in first",
      FORBIDDEN: "You are not Authorized",
      EXPIRED: "Token Expired, please log in again",
      RECOGNIZED: "Token not recognized",
      ADMIN: "Admin can't access this app",
    },
    REQUIRED: {
      EMAIL: "Email is required",
      PASSWORD: "Password is required",
      NAME: "Name is required",
      CODE: "Code is required",
      DEPARTMENT: "Department is required",
      PURPOSE_BUDGET: "Please provide a purpose for your budget",
    },
    FORBIDDEN: {
      ROLE: "Role can't be access this feature",
    },
    RELATION: {
      ANGKATAN: "Angkatan cannot be deleted because it has a relationship",
    },
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: "Internal server error",
    },
  },
  SUCCESS: {
    USER: {
      GET: "Success to get user",
      UPDATE: "Success to update user",
      DELETE: "Success to delete user",
      LOGIN: "Success to login",
      LOGOUT: "Success to logout",
      REGISTER: "Success to register",
    },
    PROFILE: {
      GET: "Success to get profile",
    },
    CATEGORY: {
      GET: "Success to get cateogry",
      CREATE: "Success to create cateogry",
      UPDATE: "Success to update cateogry",
      DELETE: "Success to delete cateogry",
    },
    AUTH: {
      SIGN_IN: "Success to sign in",
    },
    PRODUCT: {
      GET: "Success to get product",
      CREATE: "Success to create product",
      UPDATE: "Success to update product",
      DELETE: "Success to delete product",
    },
    CHART: {
      GET: "Success to get chart",
      CREATE: "Success to create chart",
      UPDATE: "Success to update chart",
      DELETE: "Success to delete chart",
      ADD: "Success add to chart",
    },
    PAYMENT_METHOD: {
      GET: "Success to get payment method",
      CREATE: "Success to create payment method",
      UPDATE: "Success to update payment method",
      DELETE: "Success to delete payment method",
    }
  },
};
