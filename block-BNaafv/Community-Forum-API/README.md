<!-- Community Forum -->

This application lists all API endpoints for creating a community forum.

- For authenticated request, add token in req headers - Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
- All routes prefix /api in their endpoint - eg: /api/users/login

<!-- Q1. REGISTER USER -->

Requirements:
method -> POST
pathname -> /users/register
required fields are
username, email, password
optional fields are
name, image, bio

It should return user document according to above User specs:
{
"user": {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
"email": "qwerty@gmail.com",
"username": "qwerty"
}
}

Ans 1.

<!-- OUTPUT -->

{
"user": {
"username": "aseshad2",
"email": "anand2@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcyM2RhNGVlYmY4OGYwNjYyOGRmOGEiLCJlbWFpbCI6ImFuYW5kMkBnbWFpbC5jb20iLCJpYXQiOjE3MDE5ODU3MDB9.DRuh4gvwLJ2u5lkKqlbMKqUgBUOOoOkA3y7V3FAQzvI"
}
}

<!-- Q2. LOGIN -->

Requirements:
method -> POST
pathname -> /users/login
required fields are
email, password
no optional fields
It should return user document according to above User specs.

Ans:

<!-- OUTPUT -->

{
"user": {
"username": "aseshad6",
"email": "anand6@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcyNDQzY2RiNDgyMzFjNzEyZjQwMTIiLCJlbWFpbCI6ImFuYW5kNkBnbWFpbC5jb20iLCJpYXQiOjE3MDE5OTExMzB9.f_FSQwcnfaEUIjKQ4bq9hwNga3vRap_mzHmAV3D4000"
}
}

<!-- Q3. Get the CURRENT USER -->

method -> GET
pathname -> /users/current-user
authentication required(token)
It should return user document according to above User specs.

Ans:<!-- OUTPUT -->

{
"user": {
"username": "aseshad6",
"email": "anand6@gmail.com",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcyNDQzY2RiNDgyMzFjNzEyZjQwMTIiLCJlbWFpbCI6ImFuYW5kNkBnbWFpbC5jb20iLCJpYXQiOjE3MDE5OTAyNzR9.PXfTWX4d0jBKrS6ENE2Jm-z7D10NZTDYN5tFJlDBvmY"
}
}

Now, a profile at this community forum must look like:
{
"profile": {
"name": "Qwerty",
"username": "qwerty",
"image": "some image url",
"bio": "tell me something about yourself"
}
}

app.js - spearate router added app.use('/api/profile', profileRouter);

<!-- Q4. Display user's PROFILE INFO:  -->

Requirements:
method -> GET
pathname -> /profile/:username
authentication optional
It should return user document according to above Profile specs.

Ans: Check profiles.js router for logic

<!-- OUTPUT -->

{
"profile":
{
"name":"Anand New",
"username":"anandsesha12345",
"image":"3628746475682834nkjdsdhsgfksdfns.jpg",
"bio":"Some random bio info4"
}
}

<!-- Q5. UPDATE user's Profile info: -->

Requirements:
method -> PUT
pathname -> /profile/:username
authentication required
optional arguments are
username, name, bio, image, email
It should return user document according to above Profile specs.

Ans.
First I register the user and login using token. Then using the username we can do a PUT req and change any info like username, name, email, image, bio.

<!-- Output -->

{
"updatedProfile":
{
"username":"aman12345",
"name":"aman",
"image":"aman12345.jpg",
"bio":"Some random guy to prove a point",
"email":"aman@gmail.com"
}
}

<!-- Q6. Create a QUESTION in the Forum -->

New route handled in app.js /api/questions

Requirements:

method -> POST
pathname -> /questions
authentication required
required fields are
title
author
slug
optional fields are
description
tags
It should return the Question which was created.

Ans.
NOTE: Since I have modelled the question schema to have author as the user who is logged in, So, when author name comes in request - using that name we get all fields of that User (including his \_id) - using that we create the question (which needs author: <userid>)

<!-- OUTPUT -->

{
"questions":[
{
"title":"What is Jason.parse?",
"author":"65726adc7069d9040b298a04",
"slug":"what-is-json-parse",
"tags":[],
"\_id":"65727da385cd3588884126e9",
"createdAt":"2023-12-08T02:21:23.450Z",
"updatedAt":"2023-12-08T02:21:23.450Z",
"\_\_v":0
}
]
}
