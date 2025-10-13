import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { splitVendorChunkPlugin } from 'vite';

// Configuração otimizada para performance
export default defineConfig({
  plugins: [
    react({
      // Otimizações do React - removendo babel-plugin-transform-remove-console
      // A remoção de console.log será feita pelo Terser na minificação
    }),
    splitVendorChunkPlugin(),
    // Analisador de bundle (apenas em build)
    process.env.ANALYZE && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Otimizações de build
  build: {
    // Tamanho máximo de chunk
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Estratégia de chunking otimizada
        manualChunks: {
          // Vendor chunks separados
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-tooltip'],
          'maps-vendor': ['@googlemaps/google-maps-services-js'],
          'pdf-vendor': ['jspdf', 'html2canvas'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority']
        },
        
        // Nomes de arquivo otimizados
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^.]*$/, '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    
    // Minificação otimizada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Source maps apenas em desenvolvimento
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Otimizações de CSS
    cssCodeSplit: true,
    cssMinify: true
  },
  
  // Otimizações de servidor de desenvolvimento
  server: {
    // Pré-bundling otimizado
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-select',
        '@radix-ui/react-tooltip',
        'clsx',
        'tailwind-merge'
      ],
      exclude: [
        // Excluir dependências que causam problemas
      ]
    }
  },
  
  // Configurações de preview
  preview: {
    port: 4173,
    strictPort: true
  },
  
  // Configurações experimentais
  experimental: {
    // Renderização otimizada
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` };
      }
      return { relative: true };
    }
  }
});