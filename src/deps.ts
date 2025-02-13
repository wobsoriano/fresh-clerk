export {
  type AuthObject,
  type ClerkClient,
  type ClerkOptions as MiddlewareOptions,
  createClerkClient,
} from 'npm:@clerk/backend@^1.24.1';

export {
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from 'npm:@clerk/backend@^1.24.1/internal';

export {
  deriveState,
  loadClerkJsScript,
  type LoadClerkJsScriptOptions,
} from 'npm:@clerk/shared@^2.21.1';

export type {
  ActiveSessionResource,
  ActJWTClaim,
  CheckAuthorization,
  CheckAuthorizationWithCustomPermissions,
  Clerk,
  ClerkOptions,
  ClientResource,
  CreateOrganizationProps,
  GoogleOneTapProps,
  InitialState,
  LoadedClerk,
  OrganizationCustomPermissionKey,
  OrganizationCustomRoleKey,
  OrganizationListProps,
  OrganizationProfileProps,
  OrganizationResource,
  OrganizationSwitcherProps,
  Resources,
  SignInProps,
  SignOutOptions,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
  UserResource,
  WaitlistProps,
  Without,
} from 'npm:@clerk/types@^4.46.0';
