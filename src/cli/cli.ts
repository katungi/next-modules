// When we run the command init we should find and modify the next.config file 
import { Command } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { ensureNextConfigExists, addModuleSystem, addModule } from './utils'

const program = new Command()

program
    .version('0.0.1')
    .description("CLI for Next.js modules")


program
    .command('init')
    .description('Initialize Next.js module system')
    .action(async () => {
        try {
            await ensureNextConfigExists()
            await addModuleSystem()
            console.log(chalk.green('✓ Initialized Next.js modules system'))
        } catch (error) {
            console.error(chalk.red('✕ Error initializing Next.js modules system'))
        }
    })

program
    .command('add <module>')
    .description('Add a module to the project')
    .action(async () => {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of your module?'
                },
                {
                    type: 'list',
                    name: 'configType',
                    message: 'What type of configuration would you like to add?',
                    choices: ['images', 'redirects', 'rewrites', 'headers', 'custom']
                }
            ])
            let options = {}
            if (answers.configType === 'images') {
                const imageAnswers = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'domains',
                        message: 'Enter image domains (comma-separated):',
                        filter: (input) => input.split(',').map(d => d.trim())
                    }
                ])
                options.images = { domains: imageAnswers.domains }
            }

            await addModule(answers.name, options)

            console.log(chalk.green(`✓ Added module ${answers.name} module configuration`))
        } catch (error) {
            console.error(chalk.red('✕ Error adding module'))
        }
    })

program.parse(process.argv)