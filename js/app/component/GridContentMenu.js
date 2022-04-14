/**
 *-------------------------------------------
 * Class GridContentMenu
 *-------------------------------------------
 * @version 1.0
 * @createAt 13.09.2021 11:47
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridContentMenu extends GridComponent
{
    selector;
    listItem;
    listContent;

    constructor (obj, nameSpace) 
    { 
        super(obj, nameSpace);

        this.selector = {
            menuItem   : 'li.content-menu-item',
            menuDataId : 'data-menu-data-id',
            active     : 'active',
        }
        this.listItem =  this.container.querySelectorAll(this.selector.menuItem);
        this.listContent = document.querySelectorAll('[' + this.selector.menuDataId + '="' + this.componentId + '"]');

        this.eventConfig = [
            {selector : this.selector.menuItem, action : "onclick", callBack : "toggleContent"},
        ];

        this.setEvents();
        this.setActiveItem();
    }

    setActiveItem ()
    {
        try {
            const activeItem = this.getActiveItem();
            if (activeItem) {
                const index = GridUi.getIndex(GridUi.closest('ul', activeItem), this.selector.menuItem, activeItem);
                const activeData = this.getIndexData(index);
                if (!activeData) {
                    activeItem.dispatchEvent(new Event('click'));
                }
            } else if (this.listItem.length && this.listContent.length) {
                this.listItem[0].dispatchEvent(new Event('click'));
            }
        } catch (error) {console.error(this.componentId + ".setActiveItem",  error.message);}
    }

    toggleContent (obj)
    {
        if (!this.listContent.length) {
            return false;
        }
        try {
            const parent = GridUi.closest('ul', obj);
            const index = GridUi.getIndex(parent, this.selector.menuItem, obj);
            const objData = this.getIndexData(index);
            const activeItem = this.getActiveItem();
            const activeData = this.getActiveData();
            // Remove active first
            if (activeItem) {
                this.toggleActive(activeItem, 'remove');
            }
            if (activeData) {
                this.toggleActive(activeData, 'remove');
            }
            // Add new active
            this.toggleActive(obj, 'add');
            if (objData) {
                this.toggleActive(objData, 'add');
            }
        } catch (error) {console.error(this.componentId + ".toggleContent",  error.message);}
    }

    toggleActive (element, act)
    {
        element.classList[act](this.selector.active);
    }

    getActiveItem ()
    {
        return this.container.querySelector('li.content-menu-item.active');
    }

    getActiveData ()
    {
        let element = null;
        [...this.listContent].filter(content => {
            if (content.classList.contains(this.selector.active)) {element = content;}
        });
        return element;
    }

    getIndexData (index)
    {
        return (this.listContent.length < index) ? null : this.listContent[index];
    }
}