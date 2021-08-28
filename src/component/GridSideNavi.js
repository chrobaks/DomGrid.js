import {GridComponent} from "../service/GridComponent";

class GridSideNavi extends GridComponent {
    selectedIndex; // Active content index
    config; // Slide settings

    constructor(obj, nameSpace) {
        super(obj, nameSpace);

        this.eventConfig = [{selector: ".btn.icon", action: "onclick", callBack: "slideTo"},];
        // Set active content index default -1
        this.selectedIndex = -1;
        // Default settings for container position
        this.config = {slideIn: 0, slideOut: 0, slideFrom: ''}

        this.setConfig();
        this.setEvents();
    }

    setConfig() {
        if (this.container.querySelector('ul.sidenavi-menu')) {
            // End position, shows content
            this.config.slideOut = this.container.offsetWidth - this.container.querySelector('ul.sidenavi-menu').offsetWidth;
            // From where to slide (left,right,bottom,top)
            this.config.slideFrom = this.getSlideFrom();
            // Add css style to content wrapper position (left,right,bottom,top)
            this.container.querySelector('.sidenavi-content').classList.add(this.config.slideFrom);
        }
    }

    slideTo(obj) {
        // New container (left,right,bottom,top) value
        const slideTo = (this.container.style[this.config.slideFrom] === '' || this.container.style[this.config.slideFrom] === -this.config.slideOut + 'px') ? this.config.slideIn : -this.config.slideOut;
        // Get menu item index
        const index = GridUi.getIndex(this.container.querySelector('ul.sidenavi-menu'), 'li', GridUi.closest('li', obj));
        // If sidenavi is closed or menu index changed
        if (this.selectedIndex !== index) {
            // Set selectedIndex from obj index
            this.setSelectedIndex(index);
            // Slide in
            if (slideTo === this.config.slideIn) {
                this.container.style[this.config.slideFrom] = slideTo + "px";
            }
        } else { // Slide out sidenavi
            // Slide out
            this.container.style[this.config.slideFrom] = -this.config.slideOut + "px";
            // Set selectedIndex default -1
            this.selectedIndex = -1;
        }
    }

    setSelectedIndex(index) {
        // Check if active content is set
        // remove class if exists
        if (this.container.querySelectorAll('.content.active').length) {
            this.container.querySelectorAll('.content.active')[0].classList.remove('active');
        }
        // Add class active to content element by index
        this.container.querySelectorAll('.content')[index].classList.add('active');
        // Change selectedIndex value
        this.selectedIndex = index;
    }

    getSlideFrom() {
        // Get direction to slide (left,right,bottom,top)
        return (this.container.classList.contains('left'))
            ? 'left'
            : ((this.container.classList.contains('right'))
                ? 'right'
                : ((this.container.classList.contains('bottom'))
                    ? 'bottom' : 'top'));
    }
}