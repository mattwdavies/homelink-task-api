import eslint from '@eslint/js';

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{ts,js}']
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic
);
