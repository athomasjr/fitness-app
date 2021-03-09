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
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal: Day;
  updateMeal: Day;
  deleteMeal: Day;
  registerUser: UserResponse;
  loginUser: UserResponse;
  updateUserGoals: UserResponse;
};


export type MutationAddMealArgs = {
  addMealInput: AddMealInput;
};


export type MutationDeleteMealArgs = {
  deleteMealInput: DeleteMealInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationUpdateUserGoalsArgs = {
  userGoalInput: UserGoalsInput;
};

export type Day = {
  __typename?: 'Day';
  _id: Scalars['ID'];
  date: Scalars['String'];
  user: User;
  dayNutrition?: Maybe<Nutrition>;
  meals: Array<Maybe<Meal>>;
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


export type Nutrition = {
  __typename?: 'Nutrition';
  calories?: Maybe<Nutrient>;
  protein?: Maybe<Nutrient>;
  carbs?: Maybe<Nutrient>;
  fat?: Maybe<Nutrient>;
  sugar?: Maybe<Nutrient>;
  fiber?: Maybe<Nutrient>;
  sodium?: Maybe<Nutrient>;
  calcium?: Maybe<Nutrient>;
  iron?: Maybe<Nutrient>;
  cholesterol?: Maybe<Nutrient>;
  potassium?: Maybe<Nutrient>;
  vitaminA?: Maybe<Nutrient>;
  vitaminC?: Maybe<Nutrient>;
};

export type Nutrient = {
  __typename?: 'Nutrient';
  nutrientName: Scalars['String'];
  unitName: Scalars['String'];
  value: Scalars['Float'];
};

export type Meal = {
  __typename?: 'Meal';
  _id: Scalars['ID'];
  name: MealName;
  foods: Array<Maybe<Food>>;
  mealNutrition?: Maybe<Nutrition>;
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

export type AddMealInput = {
  name: MealName;
  food: AddFoodInput;
  mealNutrition?: Maybe<NutritionInput>;
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
  sugar?: Maybe<NutrientInput>;
  fiber?: Maybe<NutrientInput>;
  sodium?: Maybe<NutrientInput>;
  calcium?: Maybe<NutrientInput>;
  iron?: Maybe<NutrientInput>;
  cholesterol?: Maybe<NutrientInput>;
  potassium?: Maybe<NutrientInput>;
  vitaminA?: Maybe<NutrientInput>;
  vitaminC?: Maybe<NutrientInput>;
};

export type NutrientInput = {
  nutrientName: Scalars['String'];
  unitName: Scalars['String'];
  value: Scalars['Float'];
};

export type DeleteMealInput = {
  date: Scalars['String'];
  name: MealName;
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

export type UserGoalsInput = {
  startingWeight?: Maybe<Scalars['Float']>;
  currentWeight?: Maybe<Scalars['Float']>;
  goalWeight?: Maybe<Scalars['Float']>;
};

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'email' | 'avatar' | 'height' | 'gender' | 'dateOfBirth' | 'about' | 'createdAt' | 'updatedAt'>
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