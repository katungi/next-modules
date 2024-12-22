import fs from 'fs/promises'

export async function ensureNextConfigExists() {
    const configPath = path.join(process.cwd(), 'next.config.js')

    try {
        await fs.access(configPath)
    } catch {
        const basicConfig = `/** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
    }
    
    module.exports = nextConfig
    `
        await fs.writeFile(configPath, basicConfig, 'utf-8')
    }
}

