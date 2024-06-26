/**
 * Array of routes accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/courses",
  "/api/uploadthing",
  "/courses/search",
  "/instructors",
  "/about",
  "/faq",
  "/contact",
];

/**
 * Array of routes that are used for authentication
 *
 * @type {string[]}
 */
export const authRoutes = ["/join/login", "/join/signup", "/join/error"];

/**
 * Prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
