import JsonEncoder from './encoders/json.encoder'

export default {

    install(Vue: any) {

        // encoders
        Vue.use(JsonEncoder)
    }
}