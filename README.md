# InFeedo App

  The project "InFeedo App" is an app for showing the task details.
  
### Live App URL: https://infeedo.onrender.com


## Tech Stack

  1. NodeJS (Version: 14+)
  2. ExpressJS (Version: 4+)
  4. MongoDB & Mongoose (Version: 5+)


## Quick Start

Clone the repository:

```bash
$ git clone https://github.com/amitdubeyup/infeedo
```

Goto project directory:

```bash
$ cd infeedo
```

Install dependencies:

```bash
$ npm install
```

Start the app:

```bash
$ npm start
```

  View the app at: http://localhost:3000


## REST APIs

  There is two part to REST APIs,

  1. User Details

  2. InFeedo Details

  The REST APIs to the infeedo app are described below.


### Create Task

```bash
  Method: POST
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/tasks/create
  Body: {
    "open_tasks": 10,
    "inprogress_tasks": 10,
    "completed_tasks": 10
  }
  Response: {
    "success": true,
    "message": "Task created successfully.",
    "data": {
        "open_tasks": 10,
        "inprogress_tasks": 10,
        "completed_tasks": 10,
        "_id": "652409e4fa1d2f3c56657ca3",
        "created_at": "2023-10-09T14:10:44.405Z",
        "updated_at": "2023-10-09T14:10:44.405Z",
    }
  }
 ```

### Update Task

```bash
  Method: POST
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/tasks/update
  Body: {
    "task_id": "652409e4fa1d2f3c56657ca3",
    "open_tasks": 10,
    "inprogress_tasks": 30,
    "completed_tasks": 10
  },
  Response: {
    "success": true,
    "message": "Task updated successfully.",
    "data": {
        "open_tasks": 10,
        "inprogress_tasks": 30,
        "completed_tasks": 10,
        "_id": "652409e4fa1d2f3c56657ca3",
        "created_at": "2023-10-09T14:10:44.405Z",
        "updated_at": "2023-10-09T14:10:44.405Z"
    }
  }
 ```

### Fetch Task

```bash
  Method: GET
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/tasks/fetch?limit=10&skip=0&filter=1
  Response: {
    "success": true,
    "message": "Task fetched successfully.",
    "have_prev": false,
    "have_next": true,
    "data": [
        {
            "open_tasks": 10,
            "inprogress_tasks": 30,
            "completed_tasks": 10,
            "_id": "652409e4fa1d2f3c56657ca3",
            "created_at": "2023-10-09T14:10:44.405Z",
            "updated_at": "2023-10-09T14:10:44.405Z"
        },
        {
            "open_tasks": 10,
            "inprogress_tasks": 10,
            "completed_tasks": 10,
            "_id": "652409e3fa1d2f3c56657ca1",
            "created_at": "2023-10-09T14:10:43.454Z",
            "updated_at": "2023-10-09T14:10:43.454Z"
        }
    ]
  }
 ```

### Metric Task

```bash
  Method: GET
  Header: { content-type: application/json }
  URL: http://localhost:3000/api/tasks/metric
  Response: {
    "success": true,
    "message": "Task fetched successfully.",
    "have_prev": false,
    "have_next": true,
    "data": [
        {
            "open_tasks": 10,
            "inprogress_tasks": 30,
            "completed_tasks": 10,
            "_id": "652409e4fa1d2f3c56657ca3",
            "created_at": "2023-10-09T14:10:44.405Z",
            "updated_at": "2023-10-09T14:10:44.405Z"
        },
        {
            "open_tasks": 10,
            "inprogress_tasks": 10,
            "completed_tasks": 10,
            "_id": "652409e3fa1d2f3c56657ca1",
            "created_at": "2023-10-09T14:10:43.454Z",
            "updated_at": "2023-10-09T14:10:43.454Z"
        }
    ]
  }
 ```


## People

The lead maintainer is [Amit Dubey](https://github.com/amitdubeyup)

## License

  [MIT](LICENSE)
