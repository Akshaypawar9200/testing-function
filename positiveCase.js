    let positiveTestCases = [
        {
        case:"positive",
        status:200,
        description: "should create a user with valid data",
        requestBody: {
            firstName: "Akshay",
            lastName: "pawar",
            email: "akshay@gmail.com",
        },
        mockData:{
                id: "2",
                firstName: "Akshay",
                lastName: "pawar",
                email: "akshay@gmail.com",
                createdAt: "2024-01-08 17:21:05.86+05:30",
                updatedAt: "2024-01-08 18:29:56.965+05:30",
            
        }
        },
        {   
            case:"positive",
            status:200,
            description: "should create a user with valid data",
            requestBody: {
            firstName: "om",
            lastName: "rane",
            email: "om@gmail.com",
            },
            mockData:{
                id: "3",
                firstName: "om",
                lastName: "rane",
                email: "om@gmail.com",
                createdAt: "2024-02-08 17:22:05.86+05:30",
                updatedAt: "2024-02-08 18:23:56.965+05:30",
                
            }
        },
        {   
            case:"positive",
            status:200,
            description: "should create a user with valid data",
            requestBody: {
            firstName: "rohit",
            lastName: "verma",
            email: "rohit@gmail.com",
            },
            mockData:{
                id: "4",
                firstName: "rohit",
                lastName: "verma",
                email: "rohit@gmail.com",
                createdAt: "2024-01-09 17:21:05.86+05:30",
                updatedAt: "2024-01-09 18:29:56.965+05:30",
                
            }
        },
        {     
            case:"negative",
            status:400,
            description: "throw error if request body is empty",
            requestBody: {},
            expectedErrorMessage: "badRequest: body is empty",
          },
          {
            case:"negative",
            status:400,
            description: "throw error if firstname is empty",
            requestBody: { lastName: "pawar", email: "akshay@gmail.com" },
            expectedErrorMessage: "badRequest: firstname is empty",
          },
          {
            case:"negative",
            status:400,
            description: "throw error if lastname is empty",
            requestBody: { firstName: "Akshay", email: "akshay@gmail.com" },
            expectedErrorMessage: "badRequest: lastName is empty",
          },
          {
            case:"negative",
            status:400,
            description: "throw error if email is empty",
            requestBody: { firstName: "Akshay", lastName: "pawar" },
            expectedErrorMessage: "badRequest: email is empty",
          },
        
          {
            case:"negative",
            status:400,
            description: "throw error if firstname is not in string format",
            requestBody: { firstName: 1234, lastName: "pawar",email:"akshay@gmail.com" },
            expectedErrorMessage: "badRequest: plz enter firstname in string format",
          },
          {
            case:"negative",
            status:400,
            description: "throw error if lastName is not in string format",
            requestBody: { firstName: "Akshay", lastName: 1234 ,email:"akshay@gmail.com"},
            expectedErrorMessage: "badRequest: plz enter lastName in string format",
          },
          {
            case:"negative",
            status:400,
            description: "throw error if email is not in string format",
            requestBody: { firstName: "Akshay", lastName: "pawar" ,email:1234},
            expectedErrorMessage: "badRequest: plz enter email in string format",
          },
       
          {
            case:"negative",
            status:400,
            description: "throw error if email is invalid",
            requestBody: {
              firstName: "Akshay",
              lastName: "pawar",
              email: "akshay!@gmail.com",
            },
            expectedErrorMessage: "badRequest: email is invalid",
          },
    ];

    module.exports = positiveTestCases ;