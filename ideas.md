## Core Features

- Users
- profiles
- posts
- Comments
- liking
- friend requests
- feed
- signup using gmail/github/email-password
- _possibly_ a chat system using `socket.io`.

## Steps

- Once signed in, can't see signedin page
- Users can send friend requests
- User can accept friend request
- Creating posts
- Liking posts
- commenting on posts
- Post should have content, author, comment(count from outside), likes
- timeline feed
- profile page
  - info, photo, posts, friends
- Make posts also allow images (by uploading one.)
- Allow Users to upload and update their own profile photo.

## Consider thinking about

- TDD with JEST(+ In-memory db like sqlite)
- Use `fakerjs` to mock fake data.
- Pagination
