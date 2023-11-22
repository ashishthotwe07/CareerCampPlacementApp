
# CareerCamp Interview Management System

CareerCamp is a comprehensive web application designed for managing student interviews. It provides an intuitive interface for administrators to add students, schedule interviews, track results.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Drawbacks and Future Enhancements](#drawbacks-and-future-enhancements)
- [CSV Download](#csv-download)
- [Contributing](#contributing)
- [License](#license)

## Getting Started - How to setup on local system  

### Prerequisites

Make sure you have Node.js installed on your machine. If not, download and install it from the official [Node.js website](https://nodejs.org/).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ashishthotwe07/CareerCampPlacementApp.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd CareerCampPlacementApp
   ```

3. **Install Dependencies:**

   ```bash
   npm i
   ```

4. **Set Up MongoDB:**

   Ensure that MongoDB is installed and running on the default port (27017). If you have a different MongoDB configuration, update the `config/database.js` file accordingly.


## Project Structure

The project is organized using a scalable folder structure to enhance maintainability and readability:

- **config**: Configuration files (passport js and mongoose).
- **controllers**: Logic for handling HTTP requests.
- **middlewares**: Custom middleware functions.
- **models**: Database schema definitions.
- **routes**: Express routes for different parts of the application.
- **views**: Front-end templates.
- **server.js**: Entry point for the application.

## Running the Application

1. **Run the Application:**

   ```bash
   npm start
   ```

   The application will be accessible at [http://localhost:8000](http://localhost:8000).

## Features

### Sign Up and Sign In

The application provides a secure authentication system using Passport local auth for employees.

### Student Management

Effortlessly add and view student details through an intuitive interface.

### Interview Scheduling

Schedule interviews and allocate students seamlessly to enhance the organization's interview management process.

### Result Tracking

Easily mark result statuses for students in interviews to keep track of placement progress.

## Drawbacks and Future Enhancements

While CareerCamp provides a solid foundation for interview management, there are certain areas that could be improved:

- **Error Handling**: The current implementation lacks robust error handling. Enhancements could be made to provide more informative error messages and handle edge cases gracefully.

- **External Jobs Feature**: The bonus feature of fetching real job listings is not implemented. Future enhancements could involve integrating external APIs to provide valuable job information for users.

## CSV Download

Download a comprehensive CSV file containing essential data, including student details, scores, interview dates, company names, and interview results.

## Contributing

Feel free to contribute to the project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
