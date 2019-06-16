import JsonEncoder from './encoders/json.encoder'

import KeypointLabel from './labels/keypoint.label'

import KeypointTool from './tools/keypoint.tool'

export default {

    install(Vue: any) {

        // encoders
        Vue.use(JsonEncoder)

        // labels
        Vue.use(KeypointLabel)

        // tools
        Vue.use(KeypointTool)
    }
}