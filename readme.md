# Project Name - LifeGuardAI
# Project Description - Enriching End of Life Care with Technology

# Feature Overview

- To enhance the overall support and experience for individuals approaching end of life, we have opted to employ Machine Learning (ML) algorithms to meet our objectives. There are two key aspects to this implementation:
  • The first involves aiding doctors in assessing patient criticality based on received data.
  • The second entails creating a chatbot to address patient boredom.

# Workflow

- Here's a streamlined workflow: a patient arrives at the healthcare facility, provides their details, undergoes tests, and the resulting report is entered into a web form.
- The ML algorithm processes the web form data to determine risk factors. This output is then relayed to the frontend team to generate a dashboard with analytical reports, offering a clearer understanding for the doctor.
- Using this dashboard, the doctor can make informed decisions regarding diabetes, cardiovascular issues, heart attack risks, and allocate appropriate attention to the patient.
- This information is linked to each individual and can also be accessed by their loved ones. This facilitates a deeper understanding of the patient's health condition, enabling family members to allocate time and support accordingly.


# Future Updates

The **Chatbot** serves two primary purposes:
- In situations where family members or healthcare staff are unavailable, the chatbot steps in.

### Purposes:
• Providing timely updates on the patient's vitals, making it more convenient for the doctor. Regular questions will be posed by the chatbot to the patient, whose responses will be used, via ML, to generate a conclusion on their health status. The frontend developers will then convert this into a dashboard for the doctor's access through the web application.

• Assisting the patient in communicating requests to the staff if they are inaccessible, such as needing to use the restroom or requesting water.

## Setup

### 1. Install dependencies

Install npm dependencies in both the `UI` and `server` sub-directories and also the root directory.

# checkout to server and install dependencies

```bash
cd server
npm install
```

# checkout to client and install dependencies

```bash
cd ../ui
npm install
```

````
### Set up environment variables

> **NOTE:** If you are the grader, you should have the populated `.env` in the submission zip so you can skip this step

You need to create `.env` files in `UI` directory, you can also refer to the `.env.example` included in the same location where the `.env` file should be created

#### In `ui` directory

```ini
REACT_APP_FIREBASE_KEY=""
REACT_APP_FIREBASE_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
````

## Running the Application

You could `cd` into `ui` and `server` separately (you will have to use 2 different instances of the terminal) and start each one individually:

```bash
# start the server first (Express App)
cd server
npm start
```

```bash
# start the ui (React App)
cd ui
npm start
```

Now if you didn't change any of the configurations mentioned above or the Port, the applications should be running on:

- Server: `http://localhost:3002` and
- UI : `http://localhost:3000`

## Technologies Used

- React
- Node JS
- Flask
- Python
- Machine Learning Models - SciKit Learn

