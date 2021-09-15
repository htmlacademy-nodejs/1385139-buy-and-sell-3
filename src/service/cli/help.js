'use strict';

const chalk = require(`chalk`);

const Commands = {
  '--version': `выводит номер версии`,
  '--help': ` печатает этот текст`,
  '--generate <count>': `формирует файл mocks.json`,
  '--server <port>': `запускет http-сервер. В качестве параметра можно указать номер порта, по умолчанию запускается на 3000`
};

const commandsDescription = Object.entries(Commands)
  .map(([command, description]) => `      ${command}: ${description}`).join(`\n`);


const helpText = `Программа запускает http-сервер и формирует файл с данными для api.

      Гайд:
      server <command>

      Команды:
${commandsDescription}`;

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(helpText));
  }
};
