export async function addModuleToConfig(name, options) {
    const configPath = path.join(process.cwd(), 'next.config.js')
    let content = await fs.readFile(configPath, 'utf-8')

    // Add module setup code
    const moduleCode = `
  modules.addModule('${name}', (options) => (config) => ({
    ...config,
    ${Object.entries(options).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(',\n  ')}
  }))
  `
    // Insert module before final export
    content = content.replace('module.exports', moduleCode + '\nmodule.exports')
    await fs.writeFile(configPath, content, 'utf8')
}