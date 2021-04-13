import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  day: Day;
  meals: Array<Meal>;
  dayTotals: TotalNutrition;
  user: User;
};


export type QueryDayArgs = {
  date: Scalars['String'];
};


export type QueryMealsArgs = {
  userId: Scalars['String'];
  date: Scalars['String'];
};


export type QueryDayTotalsArgs = {
  userId: Scalars['String'];
  date: Scalars['String'];
};

export type Day = {
  __typename?: 'Day';
  _id: Scalars['ID'];
  date: Scalars['String'];
  user: User;
  dayNutrition?: Maybe<TotalNutrition>;
  breakfast?: Maybe<Meal>;
  lunch?: Maybe<Meal>;
  dinner?: Maybe<Meal>;
  snacks?: Maybe<Meal>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  gender: Gender;
  dateOfBirth: Scalars['String'];
  about?: Maybe<Scalars['String']>;
  why?: Maybe<Scalars['String']>;
  inspirations?: Maybe<Array<Scalars['String']>>;
  goals?: Maybe<Goals>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER'
}

export type Goals = {
  __typename?: 'Goals';
  startingWeight?: Maybe<Scalars['Float']>;
  currentWeight?: Maybe<Scalars['Float']>;
  goalWeight?: Maybe<Scalars['Float']>;
};


export type TotalNutrition = {
  __typename?: 'TotalNutrition';
  calorieTotal: Scalars['Float'];
  proteinTotal: Scalars['Float'];
  carbsTotal: Scalars['Float'];
  fatTotal: Scalars['Float'];
};

export type Meal = {
  __typename?: 'Meal';
  _id: Scalars['ID'];
  name: MealName;
  foods: Array<Maybe<Food>>;
  mealNutrition?: Maybe<TotalNutrition>;
};

export enum MealName {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
  Snacks = 'SNACKS'
}

export type Food = {
  __typename?: 'Food';
  _id: Scalars['ID'];
  foodName: Scalars['String'];
  serving: Scalars['Int'];
  foodNutrition: Nutrition;
};

export type Nutrition = {
  __typename?: 'Nutrition';
  calories?: Maybe<Nutrient>;
  protein?: Maybe<Nutrient>;
  carbs?: Maybe<Nutrient>;
  fat?: Maybe<Nutrient>;
};

export type Nutrient = {
  __typename?: 'Nutrient';
  nutrientName: Scalars['String'];
  unitName: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal: Day;
  deleteFood: Array<Meal>;
  registerUser: UserResponse;
  loginUser: UserResponse;
  updateProfile: UserResponse;
  enterWeight: UserResponse;
  profilePicture: UserResponse;
};


export type MutationAddMealArgs = {
  addMealInput: AddMealInput;
};


export type MutationDeleteFoodArgs = {
  deleteFoodInput: DeleteFoodInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationEnterWeightArgs = {
  currentWeight: Scalars['Float'];
};


export type MutationProfilePictureArgs = {
  file: Scalars['Upload'];
};

export type AddMealInput = {
  date: Scalars['String'];
  name: MealName;
  food: AddFoodInput;
};

export type AddFoodInput = {
  foodName: Scalars['String'];
  serving: Scalars['Float'];
  foodNutrition?: Maybe<NutritionInput>;
};

export type NutritionInput = {
  calories?: Maybe<NutrientInput>;
  protein?: Maybe<NutrientInput>;
  carbs?: Maybe<NutrientInput>;
  fat?: Maybe<NutrientInput>;
};

export type NutrientInput = {
  nutrientName: Scalars['String'];
  unitName: Scalars['String'];
  value: Scalars['Float'];
};

export type DeleteFoodInput = {
  userId: Scalars['String'];
  name: MealName;
  date: Scalars['String'];
  foodIdx: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user: User;
  token: Scalars['String'];
};

export type RegisterUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  dateOfBirth: Scalars['String'];
  gender: Gender;
};

export type LoginUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateProfileInput = {
  about?: Maybe<Scalars['String']>;
  why?: Maybe<Scalars['String']>;
  inspiration0?: Maybe<Scalars['String']>;
  inspiration1?: Maybe<Scalars['String']>;
  inspiration2?: Maybe<Scalars['String']>;
};


export type DayFieldsFragment = (
  { __typename?: 'Day' }
  & Pick<Day, '_id' | 'date'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, '_id'>
  ), dayNutrition?: Maybe<(
    { __typename?: 'TotalNutrition' }
    & TotalNutritionFieldsFragment
  )>, breakfast?: Maybe<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )>, lunch?: Maybe<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )>, dinner?: Maybe<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )>, snacks?: Maybe<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )> }
);

export type FoodFieldsFragment = (
  { __typename?: 'Food' }
  & Pick<Food, '_id' | 'foodName' | 'serving'>
  & { foodNutrition: (
    { __typename?: 'Nutrition' }
    & NutritionFieldsFragment
  ) }
);

export type MealFieldsFragment = (
  { __typename?: 'Meal' }
  & Pick<Meal, '_id' | 'name'>
  & { foods: Array<Maybe<(
    { __typename?: 'Food' }
    & FoodFieldsFragment
  )>>, mealNutrition?: Maybe<(
    { __typename?: 'TotalNutrition' }
    & TotalNutritionFieldsFragment
  )> }
);

export type NutrientFieldsFragment = (
  { __typename?: 'Nutrient' }
  & Pick<Nutrient, 'nutrientName' | 'unitName' | 'value'>
);

export type NutritionFieldsFragment = (
  { __typename?: 'Nutrition' }
  & { calories?: Maybe<(
    { __typename?: 'Nutrient' }
    & NutrientFieldsFragment
  )>, protein?: Maybe<(
    { __typename?: 'Nutrient' }
    & NutrientFieldsFragment
  )>, carbs?: Maybe<(
    { __typename?: 'Nutrient' }
    & NutrientFieldsFragment
  )>, fat?: Maybe<(
    { __typename?: 'Nutrient' }
    & NutrientFieldsFragment
  )> }
);

export type TotalNutritionFieldsFragment = (
  { __typename?: 'TotalNutrition' }
  & Pick<TotalNutrition, 'calorieTotal' | 'proteinTotal' | 'carbsTotal' | 'fatTotal'>
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'avatar' | 'height' | 'gender' | 'dateOfBirth' | 'about' | 'inspirations' | 'why' | 'createdAt' | 'updatedAt'>
  & { goals?: Maybe<(
    { __typename?: 'Goals' }
    & Pick<Goals, 'startingWeight' | 'currentWeight' | 'goalWeight'>
  )> }
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & Pick<UserResponse, 'token'>
  & { user: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type AddMealMutationVariables = Exact<{
  addMealInput: AddMealInput;
}>;


export type AddMealMutation = (
  { __typename?: 'Mutation' }
  & { addMeal: (
    { __typename?: 'Day' }
    & DayFieldsFragment
  ) }
);

export type DeleteFoodMutationVariables = Exact<{
  deleteFoodInput: DeleteFoodInput;
}>;


export type DeleteFoodMutation = (
  { __typename?: 'Mutation' }
  & { deleteFood: Array<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )> }
);

export type EnterWeightMutationVariables = Exact<{
  currentWeight: Scalars['Float'];
}>;


export type EnterWeightMutation = (
  { __typename?: 'Mutation' }
  & { enterWeight: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LoginUserMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ProfilePictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type ProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & { profilePicture: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RegisterUserMutationVariables = Exact<{
  registerUserInput: RegisterUserInput;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type DayQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type DayQuery = (
  { __typename?: 'Query' }
  & { day: (
    { __typename?: 'Day' }
    & DayFieldsFragment
  ) }
);

export type DayTotalsQueryVariables = Exact<{
  date: Scalars['String'];
  userId: Scalars['String'];
}>;


export type DayTotalsQuery = (
  { __typename?: 'Query' }
  & { dayTotals: (
    { __typename?: 'TotalNutrition' }
    & TotalNutritionFieldsFragment
  ) }
);

export type MealsQueryVariables = Exact<{
  date: Scalars['String'];
  userId: Scalars['String'];
}>;


export type MealsQuery = (
  { __typename?: 'Query' }
  & { meals: Array<(
    { __typename?: 'Meal' }
    & MealFieldsFragment
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export const TotalNutritionFieldsFragmentDoc = gql`
    fragment TotalNutritionFields on TotalNutrition {
  calorieTotal
  proteinTotal
  carbsTotal
  fatTotal
}
    `;
export const NutrientFieldsFragmentDoc = gql`
    fragment NutrientFields on Nutrient {
  nutrientName
  unitName
  value
}
    `;
export const NutritionFieldsFragmentDoc = gql`
    fragment NutritionFields on Nutrition {
  calories {
    ...NutrientFields
  }
  protein {
    ...NutrientFields
  }
  carbs {
    ...NutrientFields
  }
  fat {
    ...NutrientFields
  }
}
    ${NutrientFieldsFragmentDoc}`;
export const FoodFieldsFragmentDoc = gql`
    fragment FoodFields on Food {
  _id
  foodName
  serving
  foodNutrition {
    ...NutritionFields
  }
}
    ${NutritionFieldsFragmentDoc}`;
export const MealFieldsFragmentDoc = gql`
    fragment MealFields on Meal {
  _id
  name
  foods {
    ...FoodFields
  }
  mealNutrition {
    ...TotalNutritionFields
  }
}
    ${FoodFieldsFragmentDoc}
${TotalNutritionFieldsFragmentDoc}`;
export const DayFieldsFragmentDoc = gql`
    fragment DayFields on Day {
  _id
  date
  user {
    _id
  }
  dayNutrition {
    ...TotalNutritionFields
  }
  breakfast {
    ...MealFields
  }
  lunch {
    ...MealFields
  }
  dinner {
    ...MealFields
  }
  snacks {
    ...MealFields
  }
}
    ${TotalNutritionFieldsFragmentDoc}
${MealFieldsFragmentDoc}`;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  _id
  username
  email
  avatar
  height
  gender
  dateOfBirth
  about
  inspirations
  why
  createdAt
  updatedAt
  goals {
    startingWeight
    currentWeight
    goalWeight
  }
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...UserFields
  }
  token
}
    ${UserFieldsFragmentDoc}`;
export const AddMealDocument = gql`
    mutation AddMeal($addMealInput: AddMealInput!) {
  addMeal(addMealInput: $addMealInput) {
    ...DayFields
  }
}
    ${DayFieldsFragmentDoc}`;
export type AddMealMutationFn = Apollo.MutationFunction<AddMealMutation, AddMealMutationVariables>;

/**
 * __useAddMealMutation__
 *
 * To run a mutation, you first call `useAddMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealMutation, { data, loading, error }] = useAddMealMutation({
 *   variables: {
 *      addMealInput: // value for 'addMealInput'
 *   },
 * });
 */
export function useAddMealMutation(baseOptions?: Apollo.MutationHookOptions<AddMealMutation, AddMealMutationVariables>) {
        return Apollo.useMutation<AddMealMutation, AddMealMutationVariables>(AddMealDocument, baseOptions);
      }
export type AddMealMutationHookResult = ReturnType<typeof useAddMealMutation>;
export type AddMealMutationResult = Apollo.MutationResult<AddMealMutation>;
export type AddMealMutationOptions = Apollo.BaseMutationOptions<AddMealMutation, AddMealMutationVariables>;
export const DeleteFoodDocument = gql`
    mutation DeleteFood($deleteFoodInput: DeleteFoodInput!) {
  deleteFood(deleteFoodInput: $deleteFoodInput) {
    ...MealFields
  }
}
    ${MealFieldsFragmentDoc}`;
export type DeleteFoodMutationFn = Apollo.MutationFunction<DeleteFoodMutation, DeleteFoodMutationVariables>;

/**
 * __useDeleteFoodMutation__
 *
 * To run a mutation, you first call `useDeleteFoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFoodMutation, { data, loading, error }] = useDeleteFoodMutation({
 *   variables: {
 *      deleteFoodInput: // value for 'deleteFoodInput'
 *   },
 * });
 */
export function useDeleteFoodMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFoodMutation, DeleteFoodMutationVariables>) {
        return Apollo.useMutation<DeleteFoodMutation, DeleteFoodMutationVariables>(DeleteFoodDocument, baseOptions);
      }
export type DeleteFoodMutationHookResult = ReturnType<typeof useDeleteFoodMutation>;
export type DeleteFoodMutationResult = Apollo.MutationResult<DeleteFoodMutation>;
export type DeleteFoodMutationOptions = Apollo.BaseMutationOptions<DeleteFoodMutation, DeleteFoodMutationVariables>;
export const EnterWeightDocument = gql`
    mutation EnterWeight($currentWeight: Float!) {
  enterWeight(currentWeight: $currentWeight) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type EnterWeightMutationFn = Apollo.MutationFunction<EnterWeightMutation, EnterWeightMutationVariables>;

/**
 * __useEnterWeightMutation__
 *
 * To run a mutation, you first call `useEnterWeightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnterWeightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enterWeightMutation, { data, loading, error }] = useEnterWeightMutation({
 *   variables: {
 *      currentWeight: // value for 'currentWeight'
 *   },
 * });
 */
export function useEnterWeightMutation(baseOptions?: Apollo.MutationHookOptions<EnterWeightMutation, EnterWeightMutationVariables>) {
        return Apollo.useMutation<EnterWeightMutation, EnterWeightMutationVariables>(EnterWeightDocument, baseOptions);
      }
export type EnterWeightMutationHookResult = ReturnType<typeof useEnterWeightMutation>;
export type EnterWeightMutationResult = Apollo.MutationResult<EnterWeightMutation>;
export type EnterWeightMutationOptions = Apollo.BaseMutationOptions<EnterWeightMutation, EnterWeightMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($loginUserInput: LoginUserInput!) {
  loginUser(loginUserInput: $loginUserInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const ProfilePictureDocument = gql`
    mutation ProfilePicture($file: Upload!) {
  profilePicture(file: $file) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ProfilePictureMutationFn = Apollo.MutationFunction<ProfilePictureMutation, ProfilePictureMutationVariables>;

/**
 * __useProfilePictureMutation__
 *
 * To run a mutation, you first call `useProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profilePictureMutation, { data, loading, error }] = useProfilePictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<ProfilePictureMutation, ProfilePictureMutationVariables>) {
        return Apollo.useMutation<ProfilePictureMutation, ProfilePictureMutationVariables>(ProfilePictureDocument, baseOptions);
      }
export type ProfilePictureMutationHookResult = ReturnType<typeof useProfilePictureMutation>;
export type ProfilePictureMutationResult = Apollo.MutationResult<ProfilePictureMutation>;
export type ProfilePictureMutationOptions = Apollo.BaseMutationOptions<ProfilePictureMutation, ProfilePictureMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($registerUserInput: RegisterUserInput!) {
  registerUser(registerUserInput: $registerUserInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      registerUserInput: // value for 'registerUserInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateProfileInput: // value for 'updateProfileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const DayDocument = gql`
    query Day($date: String!) {
  day(date: $date) {
    ...DayFields
  }
}
    ${DayFieldsFragmentDoc}`;

/**
 * __useDayQuery__
 *
 * To run a query within a React component, call `useDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDayQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useDayQuery(baseOptions: Apollo.QueryHookOptions<DayQuery, DayQueryVariables>) {
        return Apollo.useQuery<DayQuery, DayQueryVariables>(DayDocument, baseOptions);
      }
export function useDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DayQuery, DayQueryVariables>) {
          return Apollo.useLazyQuery<DayQuery, DayQueryVariables>(DayDocument, baseOptions);
        }
export type DayQueryHookResult = ReturnType<typeof useDayQuery>;
export type DayLazyQueryHookResult = ReturnType<typeof useDayLazyQuery>;
export type DayQueryResult = Apollo.QueryResult<DayQuery, DayQueryVariables>;
export const DayTotalsDocument = gql`
    query DayTotals($date: String!, $userId: String!) {
  dayTotals(date: $date, userId: $userId) {
    ...TotalNutritionFields
  }
}
    ${TotalNutritionFieldsFragmentDoc}`;

/**
 * __useDayTotalsQuery__
 *
 * To run a query within a React component, call `useDayTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDayTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDayTotalsQuery({
 *   variables: {
 *      date: // value for 'date'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDayTotalsQuery(baseOptions: Apollo.QueryHookOptions<DayTotalsQuery, DayTotalsQueryVariables>) {
        return Apollo.useQuery<DayTotalsQuery, DayTotalsQueryVariables>(DayTotalsDocument, baseOptions);
      }
export function useDayTotalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DayTotalsQuery, DayTotalsQueryVariables>) {
          return Apollo.useLazyQuery<DayTotalsQuery, DayTotalsQueryVariables>(DayTotalsDocument, baseOptions);
        }
export type DayTotalsQueryHookResult = ReturnType<typeof useDayTotalsQuery>;
export type DayTotalsLazyQueryHookResult = ReturnType<typeof useDayTotalsLazyQuery>;
export type DayTotalsQueryResult = Apollo.QueryResult<DayTotalsQuery, DayTotalsQueryVariables>;
export const MealsDocument = gql`
    query Meals($date: String!, $userId: String!) {
  meals(date: $date, userId: $userId) {
    ...MealFields
  }
}
    ${MealFieldsFragmentDoc}`;

/**
 * __useMealsQuery__
 *
 * To run a query within a React component, call `useMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealsQuery({
 *   variables: {
 *      date: // value for 'date'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMealsQuery(baseOptions: Apollo.QueryHookOptions<MealsQuery, MealsQueryVariables>) {
        return Apollo.useQuery<MealsQuery, MealsQueryVariables>(MealsDocument, baseOptions);
      }
export function useMealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealsQuery, MealsQueryVariables>) {
          return Apollo.useLazyQuery<MealsQuery, MealsQueryVariables>(MealsDocument, baseOptions);
        }
export type MealsQueryHookResult = ReturnType<typeof useMealsQuery>;
export type MealsLazyQueryHookResult = ReturnType<typeof useMealsLazyQuery>;
export type MealsQueryResult = Apollo.QueryResult<MealsQuery, MealsQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;