"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_encoder_1 = require("./encoders/json.encoder");
const keypoint_label_1 = require("./labels/keypoint.label");
const keypoint_tool_1 = require("./tools/keypoint.tool");
exports.default = {
    install(Vue) {
        // encoders
        Vue.use(json_encoder_1.default);
        // labels
        Vue.use(keypoint_label_1.default);
        // tools
        Vue.use(keypoint_tool_1.default);
    }
};
//# sourceMappingURL=index.js.map