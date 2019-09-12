module.exports = {
    client: {
      service: {
        name: 'graphql',
        url: 'https://pratap-new-app.herokuapp.com/v1/graphql',
        headers: {
          "content-type": "application/json", 
          "x-hasura-access-key": "PB@RS#123" 
        },
        skipSSLValidation: true,
      },
      excludes: [
        "src/**/*.{ts,tsx,js,jsx,graphql}"
    ]
    }
  };