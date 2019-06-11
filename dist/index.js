"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_encoder_1 = require("./encoders/json.encoder");
exports.default = {
    install(Vue) {
        // encoders
        Vue.use(json_encoder_1.default);
    }
};
//# sourceMappingURL=index.js.map