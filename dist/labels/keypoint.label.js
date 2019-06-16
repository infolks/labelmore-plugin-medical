"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labelmore_devkit_1 = require("@infolks/labelmore-devkit");
const paper_1 = require("paper");
exports.TYPE = 'types.medical.keypoint';
class KeypointLabel extends labelmore_devkit_1.SimpleLabelType {
    constructor() {
        super(...arguments);
        this.title = 'Keypoint';
        this.name = exports.TYPE;
        this.options = {
            showLabelTag: false
        };
    }
    vectorize(label) {
        const inner_rad = 1; //TODO: move to settings in future
        const outer_rad = 10; //TODO: move to settings in future
        const ratio = 1 / this.workspace.zoom;
        const res_inner_rad = inner_rad * ratio;
        const res_outer_rad = outer_rad * ratio;
        const p = new paper_1.Point(label.props.x - res_inner_rad, label.props.y - res_outer_rad);
        const q = new paper_1.Point(label.props.x - res_outer_rad, label.props.y - res_inner_rad);
        const hor = new this.paper.Path.Rectangle(p, new paper_1.Size(res_inner_rad * 2, res_outer_rad * 2));
        const ver = new this.paper.Path.Rectangle(q, new paper_1.Size(res_outer_rad * 2, res_inner_rad * 2));
        const path = hor.unite(ver);
        // const path = new this.paper.Path.Circle(new Point(label.props.x, label.props.y), 5)
        return path;
    }
    controls(path) {
        return [{
                hotspot: path.position,
                cursor: 'move'
            }];
    }
    apply(path) {
        return {
            x: path.position.x,
            y: path.position.y
        };
    }
}
exports.KeypointLabel = KeypointLabel;
exports.default = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$workspace && this.$settings) {
                    const keypointLabel = new KeypointLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$labeller.has(keypointLabel.name))
                        this.$labeller.register(keypointLabel.name, keypointLabel);
                }
            }
        });
    }
};
//# sourceMappingURL=keypoint.label.js.map