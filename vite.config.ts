/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import dts from 'vite-plugin-dts'; // 타입 정의 생성을 위해 추가 필요

const dirname = typeof __dirname !== 'undefined' 
  ? __dirname 
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 1. 라이브러리 빌드를 위한 dts 플러그인 추가
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'] // 테스트 파일은 타입 생성에서 제외
    })
  ],

  // Path Alias 설정
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },

  // 2. 라이브러리 빌드 설정 추가
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'MyUILibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true, // 디버깅을 위해 소스맵 생성 권장
    emptyOutDir: true, // 빌드 시 dist 폴더 비우기
  },

  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  },

  css: {
    preprocessorOptions: {
      scss: {
        // 이 설정을 하면 모든 scss 파일에서 변수/믹스인을 바로 쓸 수 있습니다.
        additionalData: `@use "@/styles/_shared.scss" as *;`
      }
    }
  },
});