/**
 * Sowas wie jQuery
 *
 * $document = new Node(window.document);
 * $body = $document.find("body");
 * $head = $document.find("head");
 * $script = $head.create("script");
 * $script.attr("src","something.js");
 * $script.data("id","4711");
 * $script.appendTo($head);
 * cologne = $script.data("id");
 */

export class Node {
    constructor(DOMNode) {
    }

    /**
     * @returns {Node}
     */
    clone() {
        return new Node(this);
    }

    /**
     * @param child {string} html
     * @returns {Node}
     */
    create(child) {
        let $child = new Node(child);
        $child.appendTo(this);
        return $child;
    }

    /** */
    delete() {

    }

    /**
     * @param selector {string} sizzle
     * @returns {Node[]}
     */
    find(selector) {
        return new Node();
    }

    /**
     * @param selector {string} sizzle
     * @returns {Node}
     */
    closest(selector) {
        return new Node();
    }

    /**
     * @param node {Node}
     * @returns {Node}
     */
    appendTo(node) {
        return this;
    }

    /**
     * @param callback {CallableFunction}
     * @returns {Node}
     */
    each(callback) {
        this.nodes.map(($node) => {
            callback($node);
        });
        return this;
    }

    /**
     * @param uri {string}
     * @returns {Promise}
     */
    load(uri) {
        return new Promise();
    }

    attr(attr, value) { // TODO WIP
        if (value !== undefined) this.node.getAttribute(attr);
        else this.node.setAttribute(attr, value);
    }

    data(data, value) {
        // TODO WIP
    }

    prop(prop, value) {
        // TODO WIP
    }
}