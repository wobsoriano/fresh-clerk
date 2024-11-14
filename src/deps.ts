export {
  type AuthObject,
  type ClerkClient,
  createClerkClient,
} from 'npm:@clerk/backend@^1.16.4';

export {
  type AuthenticateRequestOptions,
  makeAuthObjectSerializable,
  stripPrivateDataFromObject,
} from 'npm:@clerk/backend@^1.16.4/internal';

export {
  deriveState,
  loadClerkJsScript,
  type LoadClerkJsScriptOptions,
} from 'npm:@clerk/shared@^2.14.0';

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
} from 'npm:@clerk/types@^4.34.0';
