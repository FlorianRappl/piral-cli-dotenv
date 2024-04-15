import { existsSync } from 'fs';
import { CliPlugin } from 'piral-cli';
import { config, parse } from 'dotenv';

const plugin: CliPlugin = (cli) => {
  // these commands are supported
  const commands = [
    'build-piral',
    'debug-piral',
    'validate-piral',
    'build-pilet',
    'debug-pilet',
    'publish-pilet',
    'validate-pilet',
  ];

  commands.forEach((command) => {
    cli.withFlags(command, (flags) =>
      flags.string('env').describe('env', 'Sets the environment variables.').default('env', undefined),
    );

    cli.beforeCommand(command, (args) => {
      const e = args.env;

      if (typeof e === 'string') {
        if (e.indexOf('=') !== -1) {
          // the next one is actually quite dangerous,
          // but we'll do it anyway for the moment ...
          // (unfortunately dotenv does not help us here)
          const lines = e.split(';').join('\n');
          const values = parse(lines);

          Object.keys(values).forEach((key) => (process.env[key] = values[key]));
        } else {
          const paths = [e, `.env.${e}`, `${e}.env`];

          for (const path of paths) {
            if (existsSync(path)) {
              config({
                path,
              });
              break;
            }
          }
        }
      } else {
        config();
      }
    });
  });
};

module.exports = plugin;
