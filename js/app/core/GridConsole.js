/**
 *-------------------------------------------
 * Class GridConsole
 *-------------------------------------------
 * @version 1.0
 * @createAt 07.03.2022 11:42
 * @updatedAt 24.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class DomGridConsole
{
    command;

    constructor () {
        this.command = {
            commands: {
                "help": "Show all commands",
                "list": {
                    "namespace": this.nameSpace,
                }
            },
            results: [],
            set run(cmd) {
                this.results = [];
                if (/^list:/i.test(cmd)) {
                    const listCmd = cmd.split(':')?.[1];
                    this.results = this.commands["list"][listCmd]();
                } else if (this.commands?.[cmd]) {
                    this.results = this.commands[cmd];
                } else {
                    this.results = this.commands["help"];
                }
            },
            get result()
            {
                return this.results;
            }
        }
    }

    nameSpace ()
    {
        const list = document.querySelectorAll('[data-grid-name-space]');
        const result = [];
        [...list].map(element => result.push(element.dataset.gridNameSpace));

        return result;
    }

}

const GridConsole = new DomGridConsole();