# Freelancing Project - Complete System Documentation

## Project Overview

A full-stack freelancing platform connecting clients with freelancers. Clients can post projects, and freelancers can submit proposals.

---

## 1. Entity Relationship (ER) Diagram

```mermaid
erDiagram
    USER ||--o{ CLIENT : creates
    USER ||--o{ PROPOSAL : submits
    USER ||--o{ PROJECT : creates
    CLIENT ||--o{ PROJECT : owns
    PROJECT ||--o{ PROPOSAL : receives

    USER {
        ObjectId _id PK
        String fullname
        String email UK
        Number phoneNumber
        String password
        String role
        Object profile
        DateTime createdAt
        DateTime updatedAt
    }

    CLIENT {
        ObjectId _id PK
        String name UK
        String description
        String website
        String location
        String logo
        ObjectId userId FK
        DateTime createdAt
        DateTime updatedAt
    }

    PROJECT {
        ObjectId _id PK
        String title
        String description
        Array requirements
        Number budget
        Number experienceLevel
        String location
        String projectType
        String duration
        ObjectId client FK
        ObjectId created_by FK
        Array proposals
        DateTime createdAt
        DateTime updatedAt
    }

    PROPOSAL {
        ObjectId _id PK
        ObjectId project FK
        ObjectId freelancer FK
        String status
        DateTime createdAt
        DateTime updatedAt
    }
```

---

## 2. Class Diagram

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String fullname
        +String email
        +Number phoneNumber
        +String password
        +String role
        +Profile profile
        +DateTime createdAt
        +DateTime updatedAt
        +register()
        +login()
        +logout()
        +updateProfile()
    }

    class Profile {
        +String bio
        +Array~String~ skills
        +String portfolio
        +String portfolioOriginalName
        +Number hourlyRate
        +ObjectId client
        +String profilePhoto
    }

    class Client {
        +ObjectId _id
        +String name
        +String description
        +String website
        +String location
        +String logo
        +ObjectId userId
        +DateTime createdAt
        +DateTime updatedAt
        +registerClient()
        +getClient()
        +getClientById()
        +updateClient()
    }

    class Project {
        +ObjectId _id
        +String title
        +String description
        +Array~String~ requirements
        +Number budget
        +Number experienceLevel
        +String location
        +String projectType
        +String duration
        +ObjectId client
        +ObjectId created_by
        +Array~ObjectId~ proposals
        +DateTime createdAt
        +DateTime updatedAt
        +postProject()
        +getAllProjects()
        +getProjectById()
        +getClientProjects()
    }

    class Proposal {
        +ObjectId _id
        +ObjectId project
        +ObjectId freelancer
        +String status
        +DateTime createdAt
        +DateTime updatedAt
        +applyProposal()
        +getAppliedProposals()
        +getApplicants()
        +updateStatus()
    }

    User "1" --> "1" Profile : has
    User "1" --> "0..*" Client : creates
    User "1" --> "0..*" Proposal : submits
    User "1" --> "0..*" Project : creates
    Client "1" --> "0..*" Project : owns
    Project "1" --> "0..*" Proposal : receives
```

---

## 3. Data Flow Diagram (DFD)

### Level 0 - Context Diagram

```mermaid
graph TB
    subgraph External Entities
        Freelancer[Freelancer]
        Client[Client]
    end

    subgraph System
        FPS[Freelancing Platform System]
    end

    subgraph Data Store
        DB[(Database)]
    end

    Freelancer -->|Registration/Login Info| FPS
    Freelancer -->|Profile Updates| FPS
    Freelancer -->|Browse Projects| FPS
    Freelancer -->|Submit Proposals| FPS

    Client -->|Registration/Login Info| FPS
    Client -->|Create/Manage Client Profile| FPS
    Client -->|Post Projects| FPS
    Client -->|Review Proposals| FPS

    FPS -->|User Credentials| Freelancer
    FPS -->|Project Listings| Freelancer
    FPS -->|Proposal Status| Freelancer

    FPS -->|User Credentials| Client
    FPS -->|Posted Projects| Client
    FPS -->|Received Proposals| Client

    FPS <-->|Store/Retrieve Data| DB
```

### Level 1 - Major Processes

```mermaid
graph TB
    subgraph External Entities
        F[Freelancer]
        C[Client]
    end

    subgraph Processes
        P1[1.0<br/>User Authentication<br/>& Management]
        P2[2.0<br/>Client<br/>Management]
        P3[3.0<br/>Project<br/>Management]
        P4[4.0<br/>Proposal<br/>Management]
    end

    subgraph Data Stores
        D1[(D1: Users)]
        D2[(D2: Clients)]
        D3[(D3: Projects)]
        D4[(D4: Proposals)]
    end

    F -->|Login/Register| P1
    C -->|Login/Register| P1
    P1 -->|Auth Token| F
    P1 -->|Auth Token| C
    P1 <-->|User Data| D1

    C -->|Client Info| P2
    P2 <-->|Client Data| D2
    P2 -->|Client Details| C

    C -->|Project Details| P3
    F -->|Browse Projects| P3
    P3 <-->|Project Data| D3
    P3 -->|Project List| F
    P3 -->|Posted Projects| C
    P3 <-->|Client Reference| D2

    F -->|Submit Proposal| P4
    C -->|Review Proposals| P4
    P4 <-->|Proposal Data| D4
    P4 -->|Proposal Status| F
    P4 -->|Applicant List| C
    P4 <-->|Project Reference| D3
    P4 <-->|User Reference| D1
```

### Level 2 - Detailed User Authentication & Management

```mermaid
graph TB
    subgraph External Entities
        U[User - Freelancer/Client]
    end

    subgraph Authentication Processes
        P1.1[1.1<br/>Register User]
        P1.2[1.2<br/>Login User]
        P1.3[1.3<br/>Update Profile]
        P1.4[1.4<br/>Logout User]
    end

    subgraph Data Stores
        D1[(D1: Users)]
        D5[(D5: Sessions)]
    end

    subgraph External Services
        Cloud[Cloudinary<br/>Storage]
    end

    U -->|Registration Data + Photo| P1.1
    P1.1 -->|Upload Photo| Cloud
    Cloud -->|Photo URL| P1.1
    P1.1 -->|Hash Password| P1.1
    P1.1 -->|Store User| D1
    P1.1 -->|Success Message| U

    U -->|Email, Password, Role| P1.2
    P1.2 -->|Query User| D1
    D1 -->|User Data| P1.2
    P1.2 -->|Verify Credentials| P1.2
    P1.2 -->|Generate JWT Token| P1.2
    P1.2 -->|Store Session| D5
    P1.2 -->|Auth Token + User Info| U

    U -->|Profile Updates + Files| P1.3
    P1.3 -->|Verify Token| D5
    P1.3 -->|Upload Files| Cloud
    Cloud -->|File URL| P1.3
    P1.3 -->|Update User| D1
    P1.3 -->|Updated Profile| U

    U -->|Logout Request| P1.4
    P1.4 -->|Clear Session| D5
    P1.4 -->|Success| U
```

### Level 2 - Detailed Project Management

```mermaid
graph TB
    subgraph External Entities
        C[Client]
        F[Freelancer]
    end

    subgraph Project Processes
        P3.1[3.1<br/>Create Project]
        P3.2[3.2<br/>Get All Projects]
        P3.3[3.3<br/>Get Project<br/>by ID]
        P3.4[3.4<br/>Get Client<br/>Projects]
    end

    subgraph Data Stores
        D2[(D2: Clients)]
        D3[(D3: Projects)]
        D4[(D4: Proposals)]
    end

    C -->|Project Details| P3.1
    P3.1 -->|Verify Client| D2
    P3.1 -->|Store Project| D3
    P3.1 -->|Created Project| C

    F -->|Search Query| P3.2
    P3.2 -->|Query Projects| D3
    D3 -->|Project List| P3.2
    P3.2 -->|Populate Client| D2
    P3.2 -->|Projects with Client Info| F

    F -->|Project ID| P3.3
    C -->|Project ID| P3.3
    P3.3 -->|Query Project| D3
    D3 -->|Project Data| P3.3
    P3.3 -->|Get Proposals| D4
    P3.3 -->|Project with Proposals| F
    P3.3 -->|Project with Proposals| C

    C -->|Get My Projects| P3.4
    P3.4 -->|Query by Creator| D3
    D3 -->|Client's Projects| P3.4
    P3.4 -->|Populate Client| D2
    P3.4 -->|Project List| C
```

### Level 2 - Detailed Proposal Management

```mermaid
graph TB
    subgraph External Entities
        F[Freelancer]
        C[Client]
    end

    subgraph Proposal Processes
        P4.1[4.1<br/>Apply for<br/>Project]
        P4.2[4.2<br/>Get Applied<br/>Proposals]
        P4.3[4.3<br/>Get Applicants<br/>for Project]
        P4.4[4.4<br/>Update Proposal<br/>Status]
    end

    subgraph Data Stores
        D1[(D1: Users)]
        D3[(D3: Projects)]
        D4[(D4: Proposals)]
    end

    F -->|Project ID| P4.1
    P4.1 -->|Check Project| D3
    P4.1 -->|Check Duplicate| D4
    P4.1 -->|Create Proposal| D4
    P4.1 -->|Update Project| D3
    P4.1 -->|Success Message| F

    F -->|Get My Proposals| P4.2
    P4.2 -->|Query by Freelancer| D4
    D4 -->|Proposals| P4.2
    P4.2 -->|Populate Project| D3
    P4.2 -->|Populate Client| D1
    P4.2 -->|Proposal List| F

    C -->|Project ID| P4.3
    P4.3 -->|Query Project| D3
    P4.3 -->|Get Proposals| D4
    P4.3 -->|Populate Freelancers| D1
    P4.3 -->|Applicant List| C

    C -->|Proposal ID, Status| P4.4
    P4.4 -->|Update Status| D4
    P4.4 -->|Updated Proposal| C
```

---

## 4. Activity Diagrams

### User Registration Activity Diagram

```mermaid
stateDiagram-v2
    [*] --> EnterDetails: User visits signup
    EnterDetails --> ValidateInput: Submit form
    ValidateInput --> CheckFields: Validate

    CheckFields --> ErrorMissing: Missing fields
    ErrorMissing --> EnterDetails: Show error

    CheckFields --> UploadPhoto: All fields valid
    UploadPhoto --> CloudinaryUpload: Process image
    CloudinaryUpload --> CheckEmail: Get image URL

    CheckEmail --> ErrorExists: Email exists
    ErrorExists --> EnterDetails: Show error

    CheckEmail --> HashPassword: Email unique
    HashPassword --> CreateUser: Hash complete
    CreateUser --> SendResponse: Store in DB
    SendResponse --> [*]: Account created
```

### User Login Activity Diagram

```mermaid
stateDiagram-v2
    [*] --> EnterCredentials: User visits login
    EnterCredentials --> ValidateInput: Submit form
    ValidateInput --> CheckFields: Validate

    CheckFields --> ErrorMissing: Missing fields
    ErrorMissing --> EnterCredentials: Show error

    CheckFields --> FindUser: All fields valid
    FindUser --> ErrorNotFound: User not found
    ErrorNotFound --> EnterCredentials: Show error

    FindUser --> VerifyPassword: User found
    VerifyPassword --> ErrorPassword: Password incorrect
    ErrorPassword --> EnterCredentials: Show error

    VerifyPassword --> CheckRole: Password correct
    CheckRole --> ErrorRole: Role mismatch
    ErrorRole --> EnterCredentials: Show error

    CheckRole --> GenerateToken: Role matches
    GenerateToken --> SetCookie: Create JWT
    SetCookie --> SendResponse: Set cookie
    SendResponse --> [*]: Login successful
```

### Project Posting Activity Diagram

```mermaid
stateDiagram-v2
    [*] --> ClientLogin: Client authenticated
    ClientLogin --> NavigateToPost: Access post project
    NavigateToPost --> EnterProjectDetails: Fill form
    EnterProjectDetails --> ValidateInput: Submit

    ValidateInput --> ErrorMissing: Missing fields
    ErrorMissing --> EnterProjectDetails: Show error

    ValidateInput --> VerifyClient: All fields valid
    VerifyClient --> ErrorClient: Invalid client
    ErrorClient --> [*]: Access denied

    VerifyClient --> ParseRequirements: Client valid
    ParseRequirements --> CreateProject: Split requirements
    CreateProject --> SaveToDB: Store project
    SaveToDB --> SendResponse: Save complete
    SendResponse --> [*]: Project posted
```

### Proposal Submission Activity Diagram

```mermaid
stateDiagram-v2
    [*] --> FreelancerLogin: Freelancer authenticated
    FreelancerLogin --> BrowseProjects: View projects
    BrowseProjects --> SelectProject: Click project
    SelectProject --> ViewDetails: Load project details
    ViewDetails --> ClickApply: Click apply button

    ClickApply --> CheckProject: Verify project exists
    CheckProject --> ErrorProject: Project not found
    ErrorProject --> BrowseProjects: Show error

    CheckProject --> CheckDuplicate: Project exists
    CheckDuplicate --> ErrorDuplicate: Already applied
    ErrorDuplicate --> ViewDetails: Show error

    CheckDuplicate --> CreateProposal: First application
    CreateProposal --> UpdateProject: Save proposal
    UpdateProject --> AddToProjectArray: Link proposal
    AddToProjectArray --> SendResponse: Update complete
    SendResponse --> [*]: Application submitted
```

### Proposal Review Activity Diagram

```mermaid
stateDiagram-v2
    [*] --> ClientLogin: Client authenticated
    ClientLogin --> ViewProjects: Access my projects
    ViewProjects --> SelectProject: Click project
    SelectProject --> LoadApplicants: View applicants
    LoadApplicants --> ReviewProposals: Display proposals

    ReviewProposals --> SelectProposal: Click proposal
    SelectProposal --> ViewFreelancerProfile: Load details
    ViewFreelancerProfile --> MakeDecision: Review profile

    MakeDecision --> AcceptProposal: Accept
    MakeDecision --> RejectProposal: Reject
    MakeDecision --> ReviewProposals: Skip

    AcceptProposal --> UpdateStatus: Set status=accepted
    RejectProposal --> UpdateStatus: Set status=rejected
    UpdateStatus --> SaveToDB: Update proposal
    SaveToDB --> NotifyFreelancer: Send notification
    NotifyFreelancer --> [*]: Status updated
```

---

## 5. Database Tables Structure

### Table: users

| Field Name                    | Data Type     | Constraints                            | Description                 |
| ----------------------------- | ------------- | -------------------------------------- | --------------------------- |
| \_id                          | ObjectId      | PRIMARY KEY, AUTO                      | Unique user identifier      |
| fullname                      | String        | NOT NULL                               | Full name of user           |
| email                         | String        | NOT NULL, UNIQUE                       | Email address               |
| phoneNumber                   | Number        | NOT NULL                               | Contact number              |
| password                      | String        | NOT NULL                               | Hashed password             |
| role                          | String        | NOT NULL, ENUM('freelancer', 'client') | User role                   |
| profile.bio                   | String        | NULLABLE                               | User biography              |
| profile.skills                | Array[String] | NULLABLE                               | List of skills              |
| profile.portfolio             | String        | NULLABLE                               | Portfolio file URL          |
| profile.portfolioOriginalName | String        | NULLABLE                               | Original file name          |
| profile.hourlyRate            | Number        | NULLABLE                               | Hourly rate for freelancers |
| profile.client                | ObjectId      | NULLABLE, FK(clients.\_id)             | Reference to client profile |
| profile.profilePhoto          | String        | DEFAULT ''                             | Profile photo URL           |
| createdAt                     | DateTime      | AUTO                                   | Creation timestamp          |
| updatedAt                     | DateTime      | AUTO                                   | Last update timestamp       |

**Indexes:**

- PRIMARY: `_id`
- UNIQUE: `email`

---

### Table: clients

| Field Name  | Data Type | Constraints              | Description              |
| ----------- | --------- | ------------------------ | ------------------------ |
| \_id        | ObjectId  | PRIMARY KEY, AUTO        | Unique client identifier |
| name        | String    | NOT NULL, UNIQUE         | Client/Company name      |
| description | String    | NULLABLE                 | Client description       |
| website     | String    | NULLABLE                 | Company website URL      |
| location    | String    | NULLABLE                 | Client location          |
| logo        | String    | NULLABLE                 | Company logo URL         |
| userId      | ObjectId  | NOT NULL, FK(users.\_id) | Reference to user        |
| createdAt   | DateTime  | AUTO                     | Creation timestamp       |
| updatedAt   | DateTime  | AUTO                     | Last update timestamp    |

**Indexes:**

- PRIMARY: `_id`
- UNIQUE: `name`
- FOREIGN KEY: `userId` REFERENCES `users(_id)`

---

### Table: projects

| Field Name      | Data Type       | Constraints                  | Description               |
| --------------- | --------------- | ---------------------------- | ------------------------- |
| \_id            | ObjectId        | PRIMARY KEY, AUTO            | Unique project identifier |
| title           | String          | NOT NULL                     | Project title             |
| description     | String          | NOT NULL                     | Project description       |
| requirements    | Array[String]   | NULLABLE                     | List of requirements      |
| budget          | Number          | NOT NULL                     | Project budget            |
| experienceLevel | Number          | NOT NULL                     | Required experience level |
| location        | String          | NOT NULL                     | Project location          |
| projectType     | String          | NOT NULL                     | Type of project           |
| duration        | String          | NOT NULL                     | Project duration          |
| client          | ObjectId        | NOT NULL, FK(clients.\_id)   | Reference to client       |
| created_by      | ObjectId        | NOT NULL, FK(users.\_id)     | Reference to creator      |
| proposals       | Array[ObjectId] | NULLABLE, FK(proposals.\_id) | List of proposals         |
| createdAt       | DateTime        | AUTO                         | Creation timestamp        |
| updatedAt       | DateTime        | AUTO                         | Last update timestamp     |

**Indexes:**

- PRIMARY: `_id`
- FOREIGN KEY: `client` REFERENCES `clients(_id)`
- FOREIGN KEY: `created_by` REFERENCES `users(_id)`
- INDEX: `title`, `description` (for search)

---

### Table: proposals

| Field Name | Data Type | Constraints                                                | Description                |
| ---------- | --------- | ---------------------------------------------------------- | -------------------------- |
| \_id       | ObjectId  | PRIMARY KEY, AUTO                                          | Unique proposal identifier |
| project    | ObjectId  | NOT NULL, FK(projects.\_id)                                | Reference to project       |
| freelancer | ObjectId  | NOT NULL, FK(users.\_id)                                   | Reference to freelancer    |
| status     | String    | DEFAULT 'pending', ENUM('pending', 'accepted', 'rejected') | Proposal status            |
| createdAt  | DateTime  | AUTO                                                       | Creation timestamp         |
| updatedAt  | DateTime  | AUTO                                                       | Last update timestamp      |

**Indexes:**

- PRIMARY: `_id`
- FOREIGN KEY: `project` REFERENCES `projects(_id)`
- FOREIGN KEY: `freelancer` REFERENCES `users(_id)`
- COMPOSITE INDEX: `(project, freelancer)` (for duplicate check)

---

## 6. System Architecture Snapshot

```mermaid
graph TB
    subgraph Frontend Layer
        UI[React Frontend<br/>Vite + React Router]
        Redux[Redux Store<br/>State Management]
        UI --> Redux
    end

    subgraph Middleware Layer
        Auth[Authentication<br/>Middleware]
        Upload[File Upload<br/>Multer]
    end

    subgraph Backend Layer
        API[Express.js API Server<br/>Port 3000]
        Controllers[Controllers Layer]
        Routes[Routes Layer]

        Routes --> Controllers
        API --> Routes
    end

    subgraph Business Logic
        UserCtrl[User Controller<br/>register, login, logout, updateProfile]
        ClientCtrl[Client Controller<br/>CRUD operations]
        ProjectCtrl[Project Controller<br/>post, get, manage]
        ProposalCtrl[Proposal Controller<br/>apply, review, update]
    end

    subgraph Data Layer
        Models[Mongoose Models]
        MongoDB[(MongoDB Database)]
        Models --> MongoDB
    end

    subgraph External Services
        Cloudinary[Cloudinary<br/>Image Storage]
        JWT[JWT Tokens<br/>Authentication]
    end

    UI -->|HTTP/HTTPS| API
    API --> Auth
    API --> Upload
    Auth --> JWT
    Upload --> Cloudinary
    Controllers --> UserCtrl
    Controllers --> ClientCtrl
    Controllers --> ProjectCtrl
    Controllers --> ProposalCtrl
    UserCtrl --> Models
    ClientCtrl --> Models
    ProjectCtrl --> Models
    ProposalCtrl --> Models

    style Frontend Layer fill:#e1f5ff
    style Backend Layer fill:#fff4e1
    style Data Layer fill:#e8f5e9
    style External Services fill:#f3e5f5
```

---

## 7. API Endpoints Documentation

### User Routes (`/api/v1/user`)

| Method | Endpoint          | Description         | Auth Required |
| ------ | ----------------- | ------------------- | ------------- |
| POST   | `/register`       | Register new user   | No            |
| POST   | `/login`          | User login          | No            |
| GET    | `/logout`         | User logout         | Yes           |
| POST   | `/profile/update` | Update user profile | Yes           |

### Client Routes (`/api/v1/client`)

| Method | Endpoint      | Description         | Auth Required |
| ------ | ------------- | ------------------- | ------------- |
| POST   | `/register`   | Register new client | Yes           |
| GET    | `/get`        | Get all clients     | Yes           |
| GET    | `/get/:id`    | Get client by ID    | Yes           |
| PUT    | `/update/:id` | Update client       | Yes           |

### Project Routes (`/api/v1/project`)

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| POST   | `/post`              | Post new project      | Yes (Client)  |
| GET    | `/get`               | Get all projects      | Yes           |
| GET    | `/get/:id`           | Get project by ID     | Yes           |
| GET    | `/getclientprojects` | Get client's projects | Yes (Client)  |

### Proposal Routes (`/api/v1/proposal`)

| Method | Endpoint             | Description            | Auth Required    |
| ------ | -------------------- | ---------------------- | ---------------- |
| GET    | `/apply/:id`         | Apply for project      | Yes (Freelancer) |
| GET    | `/get`               | Get applied proposals  | Yes (Freelancer) |
| GET    | `/:id/applicants`    | Get project applicants | Yes (Client)     |
| POST   | `/status/:id/update` | Update proposal status | Yes (Client)     |

---

## 8. Technology Stack

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + shadcn/ui
- **HTTP Client**: Axios (implied)

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **CORS**: cors middleware
- **Cookie Parser**: cookie-parser

### Development Tools

- **Package Manager**: npm
- **Version Control**: Git
- **Environment Variables**: dotenv

---

## 9. Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **JWT Authentication**: Token-based auth with 1-day expiration
3. **HTTP-only Cookies**: Secure token storage
4. **CORS Configuration**: Restricted origins
5. **Role-Based Access**: Separate routes for freelancer/client
6. **Input Validation**: Server-side validation
7. **Middleware Protection**: isAuthenticated middleware

---

## 10. Key Features Summary

### For Freelancers:

- ✅ User registration and authentication
- ✅ Profile management with skills, portfolio, hourly rate
- ✅ Browse and search projects
- ✅ Submit proposals to projects
- ✅ View proposal status
- ✅ Profile photo upload

### For Clients:

- ✅ User registration and authentication
- ✅ Create and manage client profiles
- ✅ Post new projects with requirements
- ✅ View all posted projects
- ✅ Review received proposals
- ✅ Accept/reject proposals
- ✅ Company logo upload

### System Features:

- ✅ Real-time data synchronization
- ✅ Responsive design
- ✅ Search and filter functionality
- ✅ File upload to cloud storage
- ✅ Session management
- ✅ RESTful API architecture

---

## 11. Database Relationships Summary

```
User (1) -----> (0..n) Client
User (1) -----> (0..n) Proposal [as freelancer]
User (1) -----> (0..n) Project [as creator]

Client (1) -----> (0..n) Project

Project (1) -----> (0..n) Proposal
```

**Cardinality:**

- A User can create multiple Clients, Projects, and submit multiple Proposals
- A Client can have multiple Projects
- A Project can have multiple Proposals
- A Proposal belongs to one Project and one Freelancer (User)

---

## 12. Future Enhancement Recommendations

1. **Payment Integration**: Add Stripe/PayPal for secure payments
2. **Real-time Chat**: WebSocket implementation for client-freelancer communication
3. **Notifications**: Email/Push notifications for proposal updates
4. **Rating System**: Review and rating system for freelancers and clients
5. **Advanced Search**: Filters by budget, skills, location, etc.
6. **File Attachments**: Allow multiple file uploads for projects and proposals
7. **Contract Management**: Digital contract signing and milestone tracking
8. **Analytics Dashboard**: Insights for clients and freelancers
9. **Dispute Resolution**: Built-in dispute resolution system
10. **Mobile App**: React Native mobile application

---

_Generated on: November 10, 2025_  
_Project: Freelancing Platform_  
_Version: 1.0_
