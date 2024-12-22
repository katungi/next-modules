export async function addModuleSystem() {
    const configPath = path.join(process.cwd(), 'next.config.js')

    let content = await fs.readFile(configPath, 'utf-8')

    // Add Module System Code.
    const moduleSystem = `
    class ModuleRegistry {
        constructor() {
            this.modules = new Map()
            this.moduleOptions = new Map()
        }

        addModule(name, setupFn, options = {}) {
            this.modules.set(name, setupFn)
            this.moduleOptions.set(name, options)
        }

        applyModules(baseConfig) {
            let config = { ...baseConfig }
            for (const [name, setupFn] of this.modules) {
            const options = this.moduleOptions.get(name)
            config = setupFn(options)(config)
            }
            return config
        }
    }

    const modules = new ModuleRegistry()
    `

    // Replace existing config with module system
    content = moduleSystem + content.replace('module.exports', 'const baseConfig')
    content += '\nmodule.exports = modules.applyModules(baseConfig)\n'

    await fs.writeFile(configPath, content, 'utf-8')
}