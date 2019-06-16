"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labelmore_devkit_1 = require("@infolks/labelmore-devkit");
const keypoint_label_1 = require("../labels/keypoint.label");
class JsonEncoder extends labelmore_devkit_1.Encoder {
    constructor() {
        super(...arguments);
        this.title = "Medical JSON";
        this.icon = `<span class="uk-text-bold">{ }</span>`;
        this.name = 'encoders.medical.json';
    }
    encode(frame, project) {
        return [];
    }
    finalize(project) {
        const data = JSON.stringify(this.encodeProject(project), undefined, 4);
        return [
            {
                data: Buffer.from(data),
                subdirectory: labelmore_devkit_1.Encoder.SUBFOLDERS.ANNOTATIONS,
                name: project.title + '.json'
            }
        ];
    }
    /**
     * encode the entire project
     * @param project project to encode
     */
    encodeProject(project) {
        const attribs = project.frames.map(frame => this.encodeFrame(frame, project));
        const consultants = ['infolks'];
        const description = "";
        const batch = project.title;
        return { attribs, consultants, description, batch };
    }
    /**
     * Encode frame
     * @param frame frmae to encode
     * @param project parent project
     */
    encodeFrame(frame, project) {
        const label = frame.labels.map(label => {
            const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id);
            if (label.type === labelmore_devkit_1.DEFAULT_LABEL_TYPES.boundbox) {
                return this.boundboxLabel(label, class_);
            }
            // Contour Label
            else if (label.type === labelmore_devkit_1.DEFAULT_LABEL_TYPES.contour) {
                return this.contourLabel(label, class_);
            }
            // Keypoint Label
            else if (label.type === keypoint_label_1.TYPE) {
                return this.KeypointLabel(label, class_);
            }
        });
        const name = frame.name;
        const batch = project.title;
        return { label, name, batch };
    }
    /**
     * Encode boundbox label
     * @param label label to encode
     * @param class_ class of the label
     */
    boundboxLabel(label, class_) {
        const text = class_.name;
        const ts = new Date().getTime();
        const type = 'poly';
        const { xmin, xmax, ymin, ymax } = label.props;
        const points = [[xmin, ymin], [xmax, ymin], [xmax, ymax], [xmin, ymax]];
        return { text, points, type, ts };
    }
    /**
     * Encode contour label
     * @param label label to encode
     * @param class_ class of the label
     */
    contourLabel(label, class_) {
        const text = class_.name;
        const ts = new Date().getTime();
        const type = 'poly';
        const points = label.props.points.map(p => [p.x, p.y]);
        return { text, points, type, ts };
    }
    /**
     * Encode keypoint label
     * @param label label to encode
     * @param class_ class of the label
     */
    KeypointLabel(label, class_) {
        const text = class_.name;
        const ts = new Date().getTime();
        const type = 'point';
        const points = [label.props.x, label.props.y];
        return { text, points, type, ts };
    }
}
exports.default = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$projects) {
                    const json = new JsonEncoder();
                    if (!this.$projects.hasEncoder(json.name)) {
                        this.$projects.registerEncoder(json.name, json);
                    }
                }
            }
        });
    }
};
//# sourceMappingURL=json.encoder.js.map