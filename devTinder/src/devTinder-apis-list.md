# DevTinder APIs

## Auth Router

- Post -> /signup
- Post -> /login
- Post -> /logout

## Profile Router

- Get -> /profile/view
- Patch -> /profile/edit
- Patch -> /profile/password/edit

## User Router

- Get -> /user/feed <!-- Get a list of users in feed so user can swipe the user's profile -->
- Get -> /user/connections <!-- Get a list of user connection -->
- Get -> /user/connectionRequests <!-- Get a list of user connection request send by other user -->

## ConnectionRequest Router

<!-- Status  -> Ignore, Interest, Accept, Reject  -->

- Post -> /request/send/ignore/:ignoreUserId
- Post -> /request/send/interest/:interestUserId
- Post -> /request/review/accept/:acceptUserId
- Post -> /request/review/reject/:rejectUserId
