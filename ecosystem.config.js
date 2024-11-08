module.exports = {
    apps: [
      {
        name: "scada-ctf-app-spa",
        script: "server.cjs",
        env: {
          NODE_ENV: "production",
          PORT: 4000
        },
      },
    ],
  };
  
  