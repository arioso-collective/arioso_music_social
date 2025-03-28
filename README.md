# Arioso :headphones:
> A social media platform for music lovers to collect, share, and connect through music.

---

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Sprint 1](#sprint-1-(2/10/25-2/21/25)-:musical_note:)
* [Sprint 2](#Sprint-2-(3/03/25-3/24/25)-:notes:)
* [Next Steps](#next_steps)

<!--
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact) -->

---

## General Information
![Arioso_Logo-03](https://bitbucket.org/cs3398-enceladus-s25/arioso/raw/60f77e0922d6db40675d2d85d7fa504b468c7c37/Arioso_Logo-03.png)
  
---

## Description
- **Who’s working on it?**  
  Arioso is being developed by Juluissa Elias, Aaron Reed, Cameron Salazar, and Sebastian Zeidler.

- **What is it?**  
  Arioso is a social media platform designed for music lovers to collect, share, and connect through music.

- **Who is it for?**  
  The platform is built for general music lovers who want to connect with other fans and artists.

- **Why are we doing this?**  
  To provide a place for music lovers to foster community, discover new music, and socialize. 

---

## Technologies Used
- [MongoDB](https://www.mongodb.com/docs/) 
- [Flask](https://flask.palletsprojects.com/en/stable/)
- [React](https://react.dev/reference/react) 
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/en/stable/)
<!-- Include links to documentation where possible. -->

---

## Features
- **Login Page:**  
  - Description: [This feature allows existing users to log in to their account.]  
  - User Story: [As an existing user of Arioso, I want to securely log in to my account , so that I can access my personalized music library, share reviews, and connect with other users.] 
  - Acceptance Criteria: [System will accept valid user credentials and deny invalid credentials. Users will also be able to easily set up their own username and password] 

- **Create Account Page:**  
  - Description: [This feature allows people interested in creating an account on Arioso to signup.]  
  - User Story: [As a new user, I want to create an account on Arioso, so that I can personalize my profile, share and review music, and connect with other users.]  
  - Acceptance Criteria: [Users will be able to create an account and recieve a user ID.]

- **User Database:**  
  - Description: [Create a Database for user accounts and information.]  
  - User Story: [As a system administrator, I want to have a well-structured and secure backend user database, so that I can efficiently store, manage, and retrieve user data while ensuring privacy and security.]
  - Acceptance Criteria: [Users ID number will be stored successfully and not be accessible without the appropriate credentials. When prompted ID numbers will be used to access the users profile page.]

---

# Sprint 1 (2/10/25 - 2/21/25) :musical_note:
## Contributions
  - **Juluissa:** "Researched and started creating a comment form to interact with the database. Basis for how site will gather information"    
      - `Jira Task SCRUM-45: Create a comment form using flask` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-45
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-45-create-a-comment-form 
      - `Jira Task SCRUM-46: Research blogging style webpage code`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-46
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-46-research-blogging-style-webpage
      - `Jira Task SCRUM-47: Test cases for adding a new comment (valid and invalid data)`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-47
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-47-test-cases-for-adding-a-new-com
      - `Jira Task SCRUM-48: Display comments with their respective authors`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-48
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-48-display-comments-with-their-res
      - `Jira Task SCRUM-49: Making webpage more appealing to user`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-49
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-49-making-webpage-more-appealing-to-us
  - **Aaron:** "Started building out a profile in React and building a naviagation bar in the header."
      - `Jira Task SCRUM-57: Research React Implementation to Build Single Page using Components` 
          - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-57
            - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature%2FSCRUM-57-research-react-implementation
      - `Jira Task SCRUM-33: Add a gallery of pre-created icons that users can select from`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-33
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-33-add-a-gallery-of-pre-created-ic
<br />
  - **Cameron:** "Started an account settings form to let users personalize their profile and keep their information up to date."
       - `Jira Task SCRUM-23: Design and implement the account settings UI` 
          - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-23
            - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-23-design-and-implement-the-accoun
      - `Jira Task SCRUM-26: Display confirmation messages when changes are successfully saved`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-26
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-26-display-confirmation-messages-w
      - `Jira Task SCRUM-24: Create backend routes to handle username and email updates with validation`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-24
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-24-create-backend-routes
<br />
  - **Sebastian:** "Researched and set up initial database structure while providing functions to access and modify the database file."    
      - `Jira Task SCRUM-15: Database Schema Design & Modification Task: Design and modify the database schema to include an encrypted password field.` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-15
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature%2FSCRUM-15-database-schema-design-modifica  
      - `Jira Task SCRUM-16: Refactor Password Encryption Logic`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-16
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature%2FSCRUM-16-password-decryption-logic-imple
      - `Jira Task SCRUM-18: Unit Testing Password Encryption and Validation`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-18
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-18-unit-testing-password-encryptio
      - `Jira Task SCRUM-54: Database Connection`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-54
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature%2FSCRUM-54-database-connection
      - `Jira Task SCRUM-56: Research SQLite Database Schemas`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-56
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-56-research-sqlite-database-schema
      - `Jira Task SCRUM-58: Check Password Logic`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-58
          - Jira Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature%2FSCRUM-58-check-password-logic
<br />

## Sprint Progress Chart

This chart represents the sprint progress from February 10th, 2025, to February 21st, 2025.

![Sprint Progress](https://bitbucket.org/cs3398-enceladus-s25/arioso/raw/70d0cbaee3cfbcc296ac7af8ae733e75052bf5ad/burn_up_1.png)

## Next Steps
- **Juluissa:**
    - Research Database to move to backend team
    - Reformat files to implement react
    - Focus more on connecting UI to database
- **Aaron:** 
- **Cameron:**
    - Research React and Javascript for frontend
    - Work on UI designs for website pages(Dashboard, Profile, etc.)
    - Make sure React and Flask work together
- **Sebastian:**
    - Implement and connect the a new MongoDB Database
    - Reformat database schema and structure to better reflect accurate data types
    - Research MongoDB Databases
    - Create Login Page Logic and Functionality with Database
    - Research Firebase Deployment
    
---
    
# Sprint 2 (3/03/25 - 3/24/25) :notes:
## Contributions
### All contributions were merged into our new development branch (development_new) unless stated otherwise. We created development_new because we changed technologies between the first and second Sprint.
  - **Juluissa:** "Worked as part of backend team to get skeleton of database started and layout of app routes"    
      - `Jira Task SCRUM-91: Research Connecting Flask backend and React frontend` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-91
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-91-research-connecting-flask-backe
      - `Jira Task SCRUM-102: Set up Mongo DB account and adding to collections `
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-102
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-102-set-up-mongo-db-account-and-pr     
      - `Jira Task SCRUM-92: Implement Update Operations`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-92
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-92-implement-update-operations
      - `Jira Task SCRUM-93: Implement Delete Operations`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-93
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-93-implement-delete-operations
<br />
  - **Aaron:** "Worked as part of the frontend team to setup ProfilePage and related components. Built off the backends api routes to 
        connect the frontend SignUp an Login pages to our cloud database."
      - `Jira Task SCRUM-84: Setup Profile Page and Component Structure` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-84
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/branch/SCRUM-84-setup-and-component-structure
      - `Jira Task SCRUM-85: Display User Information`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-85
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/branch/SCRUM-85-display-user-information     
      - `Jira Task SCRUM-88: Navigation and Routing`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-88
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/branch/SCRUM-88-navigation-and-routing
      - `Jira Task SCRUM-89: State Management and Data Flow`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-89
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/branch/SCRUM-89-state-management-and-data-flow
      - `Jira Task SCRUM-94: Setup API Connection`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-95
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/branch/SCRUM-95-setup-api-connection
<br />
  - **Cameron:** "Worked as part of the frontend team to set up SignUp page and LogIn page.
      - `Jira Task SCRUM-112: Research React and JavaScript` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-112
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-112-research-react-and-javascript
      - `Jira Task SCRUM-107: Set Up the Sign-Up Page Structure `
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-107
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-107-set-up-the-sign-up-page-struct     
      - `Jira Task SCRUM-108: Implement Input Validation & User Feedback`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-108
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-108-implement-input-validation-use
      - `Jira Task SCRUM-109: Simulate API Responses & Form Submission`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-109
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-109-simulate-api-responses-form-su
      - `Jira Task SCRUM-110: Implement UI Enhancements` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-110
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-110-implement-ui-enhancements
      - `Jira Task SCRUM-59: Create Basic Component & Layout `
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-59
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-59-create-basic-component-and-layo     
      - `Jira Task SCRUM-60: Implement Form State and Validation`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-60
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-60-implement-form-state-and-valida
      - `Jira Task SCRUM-61: Mock API for Login `
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-61
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-61-mock-api-for-login     
      - `Jira Task SCRUM-62: Enhance User Experience`
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-62
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-62-enhance-user-experience-and-acc
<br />
  - **Sebastian:** "Worked on the backend team to create a Flask Backend API that can be called by the React frontend to access and modify the cloud database."
    - `Jira Task SCRUM-17: Implementing Password Hashing` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-17
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature/SCRUM-17-implementing-password-hashing
          - *This branch was merged into SCRUM-50's branch, as it was needed to hash passwords before passing them to the database using the Create Operation. Both branches belong to Sebastian, so he approved the pull request.*
    - `Jira Task SCRUM-50: Implement Create and Read Operations for Users (Backend API)` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-50
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature/SCRUM-50-implement-create-and-read-opera
    - `Jira Task SCRUM-73: MongoDB Database Setup` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-73
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature/SCRUM-73-mongodb-database-setup
    - `Jira Task SCRUM-74: Research MongoDB Database` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-74
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-74-research-mongodb-database
    - `Jira Task SCRUM-113: Implement Create and Read Operations for Posts (Backend API)` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-113
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/feature/SCRUM-113-implement-create-and-read-oper
    - `Jira Task SCRUM-114: Implement Create and Read Operations for Comments (Backend API)` 
        - Jira Link: https://cs3398-enceladus-spring.atlassian.net/browse/SCRUM-114
          - Reference: https://bitbucket.org/cs3398-enceladus-s25/arioso/commits/branch/SCRUM-114-implement-create-and-read-oper
<br />

## Sprint Progress Chart

This chart represents the sprint progress from March 3rd, 2025, to March 24th, 2025.

![Sprint Progress](https://bitbucket.org/cs3398-enceladus-s25/arioso/raw/3be0b7d83c8ca30f93611ce9ed8826fce93c56e6/burn_up_2.png)

## Next Steps 2
- **Juluissa:**
    - Work with backend team to properly connect app routes
    - Polish up database to allow for more feature additions
    - Help to enhance site after database completion
- **Aaron:**
    - Transition to axios for api endpoint calls
    - Design and implement a HomePage with a feed of user's posts
    - Improve understanding of CORS and refactor api endpoints
    - Work with backend team to develop JWT functionality
    - Incorporate music seamlessly across platform, 
- **Cameron:**
    - Design and implement footer bar that plays music
    - Design and implement settings page for NavBar
    - Change design to be more accessible visually
- **Sebastian:**
    - Work with backend team to implement new Backend API routes as needed
    - Implement some form of music REST API (Spotify API)
    - Continue researching Firebase Deployment
    - Work with frontend team to develop JWT Token functionality
    - Assist frontend and backend team with debugging as needed

## Contact
Created by Juluissa Elias, Aaron Reed, Cameron Salazar, and Sebastian Zeidler.  

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->
