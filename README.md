# Next Modules

I don't know, I think building a Next.js plugin is hard.

## Next.js Plugin System (Modulezz)

We can make it better tho right??

So the aim is:

- Make it easier to build modules (formally plugins)
- Make it easier to use modules
- Consistent API for modules
- Make it easier to discover modules

## How it works

You can use the CLI like this:

First initialize the module system:

`next-modules init`

Then add module configurations:

`next-modules add`

The CLI will:

- Create or modify your next.config.js
- Add the module system implementation directly in the config file
- Guide you through adding module configurations via interactive prompts
- No need to install additional npm packages

For example, after running these commands your next.config.js might look like:

```javascript
class ModuleRegistry {
  // ... module system implementation
}

const modules = new ModuleRegistry()

const baseConfig = {
  reactStrictMode: true,
}

modules.addModule('images', (options) => (config) => ({
  ...config,
  images: { domains: ['example.com', 'images.mycdn.com'] }
}))

module.exports = modules.applyModules(baseConfig)
```
