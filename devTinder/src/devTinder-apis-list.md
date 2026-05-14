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

- Get -> /user/connectionRequests <!-- Get a list of user connection request send by other user -->

- Get -> /user/connections <!-- Get a list of user connection -->
- Get -> /user/feed <!-- Get a list of users in feed so user can swipe the user's profile -->

## ConnectionRequest Router

<!-- Status  -> Ignored, Interested, Accepted, Rejected  -->

- Post -> /request/send/ignored/:ignoreUserId
- Post -> /request/send/interested/:interestUserId
  ( - Post -> /request/send/:status/:toUserId )

- Post -> /request/review/accepted/:acceptUserId
- Post -> /request/review/rejected/:rejectUserId
  ( - Post -> /request/review/:status/:requestedId)
