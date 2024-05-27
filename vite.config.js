import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        replaceVueWithCDN()
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'WebTerminal',
            formats: ['es', 'umd'],
            fileName: (format) => `webterminal.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})

function replaceVueWithCDN() {
    return {
        name: 'replace-vue-with-cdn',
        generateBundle(options, bundle) {
            for (const file of Object.values(bundle)) {
                if (file.type === 'chunk' && file.code) {
                    file.code = file.code.replace(
                        /import\s+\{([^}]+)\}\s+from\s+['"]vue['"]/g,
                        `import { $1 } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'`
                    )
                }
            }
        }
    }
}
