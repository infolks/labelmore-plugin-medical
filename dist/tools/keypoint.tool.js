"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labelmore_devkit_1 = require("@infolks/labelmore-devkit");
const keypoint_label_1 = require("../labels/keypoint.label");
class KeypointTool extends labelmore_devkit_1.AnnotationTool {
    constructor(labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.labeller = labeller;
        this.name = 'tools.medical.keypoint';
        this.title = 'Medical Keypoint';
        this.icon = `<i class="far fa-dot-circle"></i>`;
        this.cursor = 'crosshair';
        this.options = {
            limitToArtboard: true,
            showGuide: true
        };
    }
    onmouseup(event) {
        this.labeller.add({
            type: keypoint_label_1.TYPE,
            props: {
                x: event.point.x,
                y: event.point.y
            }
        });
    }
}
exports.default = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const keypoint = new KeypointTool(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(keypoint.name)) {
                        this.$tools.register(keypoint.name, keypoint);
                    }
                }
            }
        });
    }
};
//# sourceMappingURL=keypoint.tool.js.map