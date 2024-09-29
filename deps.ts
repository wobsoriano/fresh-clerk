export { type AuthObject, createClerkClient } from 'npm:@clerk/backend@1.13.5';

export type { AuthenticateRequestOptions } from 'npm:@clerk/backend@1.13.5/internal';

export {
  deriveState,
  loadClerkJsScript,
  type LoadClerkJsScriptOptions,
} from 'npm:@clerk/shared@2.8.4';

export type {
  ActiveSessionResource,
  ActJWTClaim,
  CheckAuthorizationWithCustomPermissions,
  Clerk,
  ClerkOptions,
  ClientResource,
  CreateOrganizationProps,
  InitialState,
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
  OrganizationProfileProps,
  OrganizationResource,
  OrganizationSwitcherProps,
  Resources,
  SignInProps,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
  UserResource,
  Without,
} from 'npm:@clerk/types@4.23.0';
