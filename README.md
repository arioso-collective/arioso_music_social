# Arioso
> A social media platform for music lovers to collect, share, and connect through music.

---

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Sprint 1](#sprint-1-(2/10/25-2/21/25))
* [Next Steps](#next_steps)
* [Sprint 2](#sprint-2-(3/03/25-3/24/25))
* [Next Steps 2](#next_steps_2)

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
- [SQLite](https://www.sqlite.org/docs.html) 
- [Flask](https://flask.palletsprojects.com/en/stable/)
- [React](https://react.dev/reference/react) 
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

## Sprint 1 (2/10/25 - 2/21/25)
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

# Sprint Progress Chart

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
    
## Sprint 2 (3/03/25 - 3/24/25)
## Contributions
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
  - **Aaron:** 
<br />
  - **Cameron:** 
<br />
  - **Sebastian:** 
<br />

# Sprint Progress Chart

This chart represents the sprint progress from March 3rd, 2025, to March 24th, 2025.

![Sprint Progress](https://bitbucket.org/cs3398-enceladus-s25/arioso/raw/3be0b7d83c8ca30f93611ce9ed8826fce93c56e6/burn_up_2.png)


## Next Steps 2
- **Juluissa:**
    - Work with backend team to properly connect app routes
    - Polish up database to allow for more feature additions
    - Help to enhance site after database completion
- **Aaron:** 
- **Cameron:**
- **Sebastian:**
## Contact
Created by Juluissa Elias, Aaron Reed, Cameron Salazar, and Sebastian Zeidler.  

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->
