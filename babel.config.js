module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "inline-dotenv",
      [
        "module-resolver",
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json',
          ],
          alias: {
            '@src': './src',
            "@components": './src/components',
            "@screens": './src/screens',
            "@assets": './src/assets',
            "@hooks": './src/hooks',
          }
        }
      ]
    ]
  };
};
