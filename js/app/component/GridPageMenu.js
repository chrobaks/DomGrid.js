class GridPageMenu extends GridComponent
{
    activeId;
    statusObj;

    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector : "li.menu-item", action : "onclick", callBack : "toggleActiveItem"},
        ];
        // Set a status object to control smooth scroll action
        this.statusObj = {status : 0};
        // Set the active content element id
        this.activeId = (this.container.querySelectorAll("li.menu-item.active").length)
         ? GridUi.dataSetValue(this.container.querySelectorAll("li.menu-item.active")[0], 'id') : '';
        // Bind checkScroll to window scroll event
        window.addEventListener("scroll", () => {this.checkScroll();});

        this.setEvents();
    }

    checkScroll ()
    {
        if (!this.statusObj.status) {

            const index = GridUi.getIndex(this.container, "li.menu-item",this.container.querySelectorAll("li.menu-item.active")[0]);

            if (window.scrollY + 10 < document.getElementById(this.activeId).offsetTop) {

                if (index && this.container.querySelectorAll("li.menu-item")[index].classList.contains('active')) {
                    this.toggleActiveItem(this.container.querySelectorAll("li.menu-item")[index-1]);
                }
            } else {
                if (this.container.querySelectorAll("li.menu-item").length > index +1 ) {

                    const nextId = GridUi.dataSetValue(this.container.querySelectorAll("li.menu-item")[index+1], 'id');

                    if (nextId && document.getElementById(nextId) && window.scrollY + 20 > document.getElementById(nextId).offsetTop) {
                        if (index >= 0 && this.container.querySelectorAll("li.menu-item")[index].classList.contains('active')) {
                            this.toggleActiveItem(this.container.querySelectorAll("li.menu-item")[index+1]);
                        }
                    }
                }
            }
        }
    }

    smoothScroll (obj)
    {
        const id = GridUi.dataSetValue(obj, 'id');

        if (id && document.getElementById(id)) {

            const y = document.getElementById(id).offsetTop - 10;

            this.toggleActiveItem(obj);
            this.statusObj.status = 1;

            window.requestAnimationFrame(() => {GridUi.checkScrollEnd(y, this.statusObj)});

            window.scrollTo({
                top: y,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    toggleActiveItem (obj)
    {
        if (this.container.querySelectorAll("li.menu-item.active").length) {
            this.container.querySelectorAll("li.menu-item.active")[0].classList.remove('active');
        }
        obj.classList.add('active');
        this.activeId = GridUi.dataSetValue(obj, 'id');
    }
}