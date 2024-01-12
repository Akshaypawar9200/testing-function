let serviceCases = [
  {
  case:"positive",
  description: "check user created",
  mockData: {
    firstName: "Akshay",
    lastName: "pawar", 
    email:"akshay@gmail.com"
  },
  modelData:{
    id: "1",
    firstName: "Akshay",
    lastName: "pawar",
    email:"akshay@gmail.com",
    createdAt: "2024-01-11 15:23:27.495+05:30",
    updatedAt: "2024-01-11 15:23:27.495+05:30"
  }
  }
]
  

module.exports = serviceCases ;