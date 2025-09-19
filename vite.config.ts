import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { splitVendorChunkPlugin } from 'vite';
import { componentTagger } from "lovable-tagger";

// Configuração otimizada para performance
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Otimizações do React - removendo babel-plugin-transform-remove-console
      // A remoção de console.log será feita pelo Terser na minificação
    }),
    splitVendorChunkPlugin(),
    mode === 'development' && componentTagger(),
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
        drop_console: mode === 'production',
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
    sourcemap: mode === 'development',
    
    // Otimizações de CSS
    cssCodeSplit: true,
    cssMinify: true
  },
  
  // Configuração do servidor de desenvolvimento
  server: {
    host: "::",
    port: 8080,
    
    // Headers de segurança
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    
    // Configuração de proxy para resolver CORS
    proxy: {
      '/api/infinitepay': {
        target: 'https://admin.executivepremium.com.br/infinitepay',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/infinitepay/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    },

    // Otimizações de dependências
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
      ]
    }
  },
  
  // Configurações de preview
  preview: {
    port: 4173,
    strictPort: true
  }
}));
