import { SimpleLabelType, BasicLabelTypeOptions, Label, Control } from "@infolks/labelmore-devkit";
import { Point, Size, Path } from "paper";

export const TYPE = 'types.medical.keypoint'

export class KeypointLabel extends SimpleLabelType {

    public readonly title = 'Keypoint'
    public readonly name = TYPE

    public readonly options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false
    }

    vectorize(label: Label) {

        const inner_rad = 1 //TODO: move to settings in future

        const outer_rad = 10 //TODO: move to settings in future

        const ratio = 1/this.workspace.zoom

        const res_inner_rad = inner_rad * ratio

        const res_outer_rad = outer_rad * ratio

        const p = new Point(label.props.x - res_inner_rad, label.props.y - res_outer_rad)

        const q = new Point(label.props.x - res_outer_rad, label.props.y - res_inner_rad)

        const hor = new this.paper.Path.Rectangle(p, new Size(res_inner_rad*2, res_outer_rad*2))

        const ver = new this.paper.Path.Rectangle(q, new Size(res_outer_rad*2, res_inner_rad*2))

        const path = hor.unite(ver)

        // const path = new this.paper.Path.Circle(new Point(label.props.x, label.props.y), 5)

        return path;

    }

    controls(path: Path): Control[] {
        return [{
            hotspot: path.position,
            cursor: 'move'
        }]
    }


    apply(path: Path): any {
        
        return {
            x: path.position.x,
            y: path.position.y
        }
    }
}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$workspace && this.$settings) {

                    const keypointLabel = new KeypointLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

                    if (!this.$labeller.has(keypointLabel.name)) this.$labeller.register(keypointLabel.name, keypointLabel)
                }
            }
        })
    }
}