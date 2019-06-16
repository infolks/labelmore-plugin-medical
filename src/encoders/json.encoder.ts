import {Encoder, Project, Frame, FileWriteInfo, Label, ProjectManager, LabelClass, ContourLabel, BoundboxLabel, DEFAULT_LABEL_TYPES} from "@infolks/labelmore-devkit"

import {TYPE as KEYPOINT_TYPE } from '../labels/keypoint.label'
class JsonEncoder extends Encoder {

    public readonly title = "Medical JSON"
    public readonly icon = `<span class="uk-text-bold">{ }</span>`
    public readonly name = 'encoders.medical.json'

    encode(frame: Frame, project: Project): FileWriteInfo[] {
        return []
    }
    
    finalize(project: Project): FileWriteInfo[] {
        
        const data = JSON.stringify(this.encodeProject(project), undefined, 4)

        return [
            {
                data: Buffer.from(data),
                subdirectory: Encoder.SUBFOLDERS.ANNOTATIONS,
                name: project.title + '.json'
            }
        ]
    }

    /**
     * encode the entire project
     * @param project project to encode
     */
    private encodeProject(project: Project) {
        const attribs = project.frames.map(frame => this.encodeFrame(frame, project))

        const consultants = ['infolks']

        const description = ""

        const batch = project.title

        return { attribs, consultants, description, batch }
    }

    /**
     * Encode frame
     * @param frame frmae to encode
     * @param project parent project
     */
    private encodeFrame(frame: Frame, project: Project) {

        const label = frame.labels.map(
            label => {

                const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id)

                if (label.type === DEFAULT_LABEL_TYPES.boundbox) {

                    return this.boundboxLabel(label, class_)

                }

                // Contour Label
                else if (label.type === DEFAULT_LABEL_TYPES.contour){

                    return this.contourLabel(label, class_)

                }

                // Keypoint Label

                else if (label.type === KEYPOINT_TYPE) {

                    return this.KeypointLabel(label, class_)
                }
            }
        )

        const name = frame.name

        const batch = project.title

        return {label, name, batch}
    }

    /**
     * Encode boundbox label
     * @param label label to encode
     * @param class_ class of the label
     */
    private boundboxLabel(label: BoundboxLabel, class_: LabelClass) {

        const text = class_.name

        const ts = new Date().getTime()

        const type = 'poly'

        const {xmin, xmax, ymin, ymax} = label.props

        const points = [[xmin, ymin], [xmax, ymin], [xmax, ymax], [xmin, ymax]]

        return {text, points, type, ts}
    }

    /**
     * Encode contour label
     * @param label label to encode
     * @param class_ class of the label
     */
    private contourLabel(label: ContourLabel, class_: LabelClass) {

        const text = class_.name

        const ts = new Date().getTime()

        const type = 'poly'

        const points = label.props.points.map( p => [p.x, p.y])

        return {text, points, type, ts}

    }

    /**
     * Encode keypoint label
     * @param label label to encode
     * @param class_ class of the label
     */
    private KeypointLabel(label: Label, class_: LabelClass) {

        const text = class_.name

        const ts = new Date().getTime()

        const type = 'point'

        const points = [label.props.x, label.props.y]

        return {text, points, type, ts}

    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {

                if (this.$projects) {

                    const json = new JsonEncoder()

                    if (!this.$projects.hasEncoder(json.name)) {

                        this.$projects.registerEncoder(json.name, json)
                    }
                }
            }
        })
    }
}