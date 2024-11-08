module.exports = {
    apps: [
      {
        name: "scada-ctf-app",
        script: "serve",
        args: "-s dist -l 4000",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  