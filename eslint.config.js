import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config(
  {
    ignores: ['.next/', 'node_modules/', 'out/', 'build/']
  },
  
  // Base JavaScript configuration
  js.configs.recommended,
  
  // TypeScript configuration
  ...tseslint.configs.recommended,
  
  // Next.js configuration using compatibility layer
  ...compat.extends('next/core-web-vitals'),
  
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // React/Next.js rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'warn',
      
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-useless-escape': 'warn',
    },
  }
)