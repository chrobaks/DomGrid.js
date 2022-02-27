class GridSidePanel extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.selector = {
            btnContainer: 'ul.sidenavi-menu',
            btnItem: '.btn-slide',
            content: '.sidenavi-content',
            contentPage: '.content-page',
            contentPageActive: '.content-page.active',
        };
        this.btnContainer = this.container.querySelector(this.selector.btnContainer);
        this.btnList = this.btnContainer.querySelectorAll(this.selector.btnItem);
        this.btnIndexList = Array.prototype.slice.call(this.btnList);
        this.start = undefined;
        this.previousTimeStamp = undefined;
        this.done = false;
        this.direction = 'in';
        this.count = 0;
        this.speed = 0.5;
        this.slideFrom = (this.container.classList.contains('right')) ?  'right' : 'left';
        this.posIn = 0;
        this.posOut = 0;
        this.selectedIndex = -1;
        this.container.querySelector(this.selector.content).classList.add(this.slideFrom);
        this.eventConfig = [ {selector : this.selector.btnItem, action : "onclick", callBack : "setSlide"}, ];

        this.setPosIn();
        this.setEvents();
    }
    setPosIn ()
    {
        this.posIn = (this.slideFrom === 'left')
            ? this.container["offsetLeft"]
            : (window.innerWidth - this.container.offsetLeft - this.container.offsetWidth) - (window.innerWidth - document.documentElement.clientWidth);
    }

    setSelectedIndex (index)
    {
        if (this.container.querySelectorAll(this.selector.contentPageActive).length) {
            this.container.querySelectorAll(this.selector.contentPageActive)[0].classList.remove('active');
        }
        this.container.querySelectorAll(this.selector.contentPage)[index].classList.add('active');
        this.selectedIndex = index;
    }

    setSlide (obj)
    {
        const index = this.getIndex(obj);
        if (this.selectedIndex === -1 || this.selectedIndex === index) {
            if (this.selectedIndex === -1) {
                this.setSelectedIndex(index);
            }
            this.count = (this.direction === 'out') ? this.posOut : this.posIn;
            this.start = undefined;
            this.previousTimeStamp = undefined;
            this.done = false;

            window.requestAnimationFrame(this.slide.bind(this));
        } else {
            this.setSelectedIndex(index);
        }
    }

    getIndex (obj)
    {
        return this.btnIndexList.indexOf(obj);
    }

    slide(timestamp)
    {
        if (this.start === undefined) {this.start = timestamp;}
        const elapsed = timestamp - this.start;

        if (this.previousTimeStamp !== timestamp) {
            this.count = (this.direction === 'in')
                ? this.posIn + (this.speed * elapsed)
                : this.posOut - (this.speed * elapsed);

            if (this.direction === 'in' && this.count > this.posOut) {this.count = this.posOut;}
            if (this.direction === 'out' && this.count < this.posIn) {this.count = this.posIn;}

            this.container.style[this.slideFrom] = this.count + 'px';

            if (
                this.count >= this.posOut && this.direction === 'in'
                || this.count <= this.posIn && this.direction === 'out'
            ) {
                this.done = true;
                this.direction = (this.direction === "out") ? 'in' : 'out';
                if (this.direction === 'in' ) {
                    this.selectedIndex = -1;
                }
            }
        }
        if (elapsed < 3700) {
            this.previousTimeStamp = timestamp
            !this.done && window.requestAnimationFrame(this.slide.bind(this));
        }
    }
}