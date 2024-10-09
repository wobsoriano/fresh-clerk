export {
  type AuthObject,
  type ClerkClient,
  createClerkClient,
} from 'npm:@clerk/backend@^1.13.8';

export {
  type AuthenticateRequestOptions,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from 'npm:@clerk/backend@^1.13.8/internal';

export {
  deriveState,
  loadClerkJsScript,
  type LoadClerkJsScriptOptions,
} from 'npm:@clerk/shared@^2.9.0';

export type {
  ActiveSessionResource,
  ActJWTClaim,
  CheckAuthorization,
  CheckAuthorizationWithCustomPermissions,
  Clerk,
  ClerkOptions,
  ClientResource,
  CreateOrganizationProps,
  InitialState,
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
  Without,
} from 'npm:@clerk/types@^4.25.0';
