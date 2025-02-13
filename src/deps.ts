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

export {
  apiUrlFromPublishableKey,
} from 'npm:@clerk/shared@^2.21.1/apiUrlFromPublishableKey';

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
  SignInButtonProps,
  SignInProps,
  SignOutOptions,
  SignUpButtonProps,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
  UserResource,
  WaitlistProps,
  Without,
} from 'npm:@clerk/types@^4.46.0';
