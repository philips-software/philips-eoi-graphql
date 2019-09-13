module.exports = {
    client: {
      service: {
        name: 'graphql',
        url: 'https://sub-test-postgres.herokuapp.com/v1/graphql',
        headers: {
          "content-type": "application/json", 
          "x-hasura-admin-secret": "password123" 
        },
      },
    //   excludes: [
    //     "src/**/*.{ts,tsx,js,jsx,graphql}"
    // ]
    }
  };