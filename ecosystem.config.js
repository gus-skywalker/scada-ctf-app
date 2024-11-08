module.exports = {
    apps: [
      {
        name: "scada-ctf-app",
        script: "serve",
        args: "-s dist --listen 4000",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  