db.getSiblingDB('blog').createUser(
    {
      user: "x",
      pwd: "x",
      roles: ["readWrite"]
    }
)