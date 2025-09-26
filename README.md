
```markdown
# Tesla End-to-End QA Framework 🚗⚡

This project is a **mock end-to-end QA framework** built around a replica of the Tesla Insurance flow.  
Since Tesla’s real Insurance platform is not publicly automatable, I designed a **demo project** that mirrors how QA engineers at Tesla would validate **UI, API, DB, and Performance layers** using modern automation tools.

---

## 🔹 Project Overview

- **UI Testing (Selenium + Java)**
  - Built a small **replica Tesla Insurance webpage**.
  - Automated **3 functional test cases** with Selenium + TestNG.
  - Demonstrates real browser automation against a working web UI.

- **UI Testing (Playwright + TypeScript)**
  - Since Tesla’s **real insurance page blocks automation**, wrote **6–7 test cases** in Playwright TypeScript.
  - These illustrate how tests would look for form validation, navigation, and user flows.

- **Load / Performance Testing (JMeter)**
  - Simulated user traffic against Tesla’s real insurance site.
  - Requests were blocked (as expected), but setup shows ability to design and execute load test plans.

- **API Testing (Cypress + Mock Backend)**
  - Built a **mock backend with Flask** to simulate Tesla Insurance APIs.
  - Endpoints:
    - `GET /insurance-info` → returns static insurance plans.
    - `POST /get-quote` → calculates premium and returns a quote.
  - Wrote **4 Cypress API test cases**:
    - 3 passed ✅
    - 1 failed ❌ (intentional invalid endpoint).
  - Viewed Cypress GUI test runner for results.

- **API Testing (PyTest + Requests)**
  - Wrote **1 PyTest API test case** against the Flask backend.
  - Validated `POST /get-quote` success scenario.
  - Generated an **HTML report** using `pytest-html`.

- **Database Validation (SQLite + PyTest)**
  - Extended backend to store quotes in **SQLite DB**.
  - Added:
    - Manual SQL query validation.
    - Automated **PyTest DB validation** to confirm persistence of quote data.

---

## 🔹 Tools & Technologies

- **UI Automation**: Selenium (Java, TestNG), Playwright (TypeScript)
- **API Testing**: Cypress (JavaScript), PyTest + Requests (Python)
- **Mock Backend**: Flask (Python)
- **Database**: SQLite (for persistence + validation)
- **Performance Testing**: Apache JMeter
- **Reporting**: Cypress GUI reports, PyTest HTML reports
- **Version Control**: Git + GitHub

---

## 🔹 Folder Structure

```

TESLASELENIUMPROJECT/
├── tesla-insurance-ui-selenium/      # Selenium Java UI automation
├── tesla-insurance-playwright/       # Playwright TypeScript UI test scripts
├── mock-backend-flask/               # Flask mock backend + DB
│   ├── app.py                        # API endpoints
│   ├── db/                           # SQLite database + helpers
│   └── tests/                        # PyTest API & DB validation tests
├── api-tests-cypress/                # Cypress API tests
├── load-tests-jmeter/                # JMeter load test plans
└── README.md                         # Project documentation

````

---

## 🔹 How to Run

### 1. Clone repo
```bash
git clone https://github.com/IshaAg07/Tesla_End_To_End_QA_Framework.git
cd Tesla_End_To_End_QA_Framework
````

### 2. UI Tests

* **Selenium (Java + TestNG)** → Run via Maven or IDE.
* **Playwright (TypeScript)** → Run via `npx playwright test`.

### 3. Mock Backend

```bash
cd mock-backend-flask
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
PORT=5050 python app.py
```

### 4. API Tests

* **Cypress**:

  ```bash
  cd api-tests-cypress
  npx cypress open
  ```
* **PyTest API**:

  ```bash
  cd mock-backend-flask
  pytest --html=report.html --self-contained-html
  ```

### 5. DB Validation

* Run manual SQL queries via `sqlite3 db/insurance.db`.
* Or run automated PyTest validation:

  ```bash
  pytest tests/test_db_validation.py
  ```

### 6. JMeter Load Testing

* Open `.jmx` plan in Apache JMeter.
* Run with configured number of threads and view results.

---

## 🔹 Key Learning Outcomes

* ✅ Designed a **full-stack QA framework** covering UI, API, DB, and Performance testing.
* ✅ Demonstrated proficiency in **multiple automation frameworks** (Selenium, Playwright, Cypress, PyTest).
* ✅ Created a **mock backend with persistence** to simulate real-world Tesla Insurance flows.
* ✅ Integrated **reporting and validation** for both APIs and databases.
* ✅ Practiced **industry-standard workflows**: test planning, automation, reporting, and validation.

---

## 🔹 Author

👤 **Isha Agrawal**
GitHub: [IshaAg07](https://github.com/IshaAg07)
Project: *Tesla End-to-End QA Framework*

---

