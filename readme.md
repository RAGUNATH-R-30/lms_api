# Learning Management System API

Welcome to the Learning Management System API documentation. This API provides endpoints for managing courses, users, mentors, admins, and payments.

## Course Routes (/courseRoutes)

### Upload Course
- **POST /uploadcourse**
  - **Description:** Uploads a new course.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.uploadcourse

### Upload Video
- **POST /uploadvideo**
  - **Description:** Uploads a video for a course.
  - **Authentication:** Requires authentication.
  - **Middleware:** upload.single('video')
  - **Controller:** courseController.uploadvideo

### Get My Courses
- **POST /mycourses**
  - **Description:** Retrieves courses for the authenticated user.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getMycourses

### Get Course by ID
- **POST /getcoursebyid**
  - **Description:** Retrieves a course by its ID.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getCoursebyId

### Get Video URL
- **POST /getvideourl**
  - **Description:** Retrieves the URL of a video.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getVideoUrl

### Get All Videos
- **POST /getallvideos**
  - **Description:** Retrieves all videos.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getAllvideos

### Get All Courses
- **GET /getallcourses**
  - **Description:** Retrieves all courses.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getAllcourses

### Enroll Course
- **POST /enrollcourse**
  - **Description:** Enrolls the user in a course.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.enrollCourse

### Get User Courses
- **POST /getusercourses**
  - **Description:** Retrieves courses for a specific user.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getUsercourses

### Create Quiz
- **POST /createquiz**
  - **Description:** Creates a quiz for a course.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.createQuiz

### Get User Progress
- **POST /getuserprogress**
  - **Description:** Retrieves the progress of a user in a course.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getUserprogress

### Get Quiz
- **POST /getquiz**
  - **Description:** Retrieves a quiz for a course.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.getQuiz

### Update Quiz Answer
- **POST /updatequizanswer**
  - **Description:** Updates the answer for a quiz.
  - **Authentication:** Requires authentication.
  - **Controller:** courseController.updateQuizanswer

## User Routes (/userRoutes)

### Register User
- **POST /register**
  - **Description:** Registers a new user.
  - **Controller:** userController.register

### Login User
- **POST /login**
  - **Description:** Logs in a user.
  - **Controller:** userController.login

### Get Current User
- **GET /me**
  - **Description:** Retrieves the details of the currently authenticated user.
  - **Authentication:** Requires authentication.
  - **Controller:** userController.me

## Mentor Routes (/mentorRoutes)

### Register Mentor
- **POST /mentorregister**
  - **Description:** Registers a new mentor.
  - **Controller:** userController.mentorRegister

### Login Mentor
- **POST /mentorlogin**
  - **Description:** Logs in a mentor.
  - **Controller:** userController.mentorLogin

### Get Current Mentor
- **GET /mentorme**
  - **Description:** Retrieves the details of the currently authenticated mentor.
  - **Authentication:** Requires mentor authentication.
  - **Controller:** userController.mentorme

## Admin Routes (/adminRoutes)

### Register Admin
- **POST /adminregister**
  - **Description:** Registers a new admin.
  - **Controller:** userController.adminRegister

### Login Admin
- **POST /adminlogin**
  - **Description:** Logs in an admin.
  - **Controller:** userController.adminLogin

### Get Mentor Requests
- **GET /getmentorrequests**
  - **Description:** Retrieves mentor requests.
  - **Authentication:** Requires admin authentication.
  - **Controller:** userController.getMentorrequests

### Request Mentorship
- **POST /requestmentor**
  - **Description:** Sends a mentorship request.
  - **Authentication:** Requires authentication.
  - **Controller:** userController.requestMentor

### Update Mentor Registration
- **POST /mentorregisterupdate**
  - **Description:** Updates mentor registration details.
  - **Authentication:** Requires authentication.
  - **Controller:** userController.mentorRegisterUpdate

### Get User Requests
- **POST /getuserrequest**
  - **Description:** Retrieves user mentorship requests.
  - **Authentication:** Requires authentication.
  - **Controller:** userController.getUserrequest

## Payment Routes (/paymentRoutes)

### Checkout
- **POST /checkout**
  - **Description:** Initiates a payment checkout.
  - **Authentication:** Requires authentication.
  - **Controller:** paymentController.checkout

### Payment Verification
- **POST /verification**
  - **Description:** Verifies a payment.
  - **Authentication:** Requires authentication.
  - **Controller:** paymentController.verification
