class GridDevConsole extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.cmdInput = this.container.querySelector("input.inpt-console");
        this.cmdInput.addEventListener("keyup", (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                this.setCommand();
            }
        });
    }

    setCommand ()
    {
        GridConsole.command.run = this.cmdInput.value;
        console.log(GridConsole.command.result)
    }
}