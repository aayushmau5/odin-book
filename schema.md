# API's Schema

## Types

1. User

   ```gql
   type User {
     id: ID!
     username: String!
     email: String!
     profile: ProfileWithoutUser
     createdAt: DateTime!
   }

   type UserWithoutProfile {
     id: ID!
     username: String!
     email: String!
     createdAt: DateTime!
   }
   ```

2. Profile

## Inputs

## Query

```graphql
{
    users: [User]
    profiles: [Profile]
}
```

## Mutation

## Subscription

TBA
