module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    // You can add custom rules here
  },
  overrides: [
    {
      files: ['**/*.css', '**/*.scss', '**/*.sass'],
      customSyntax: 'postcss-scss',
    },
  ],
};
