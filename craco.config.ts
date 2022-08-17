const CracoAlias = require("craco-alias");

const config = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.json",
      },
    },
  ],
};

export default config;
