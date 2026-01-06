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

  // 2. 라이브러리 빌드 설정 추가
  build: {
    lib: {
      // 라이브러리의 진입점 (src/index.ts 파일이 필요합니다)
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'MyUILibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 사용자가 설치했을 때 중복되지 않도록 리액트를 빌드에서 제외
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

  // 3. 기존 테스트 설정 (그대로 유지)
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
  }
});