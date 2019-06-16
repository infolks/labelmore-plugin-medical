import {AnnotationTool, AnnotationToolOptions, LabelManager, WorkspaceManager, SettingsManager, DEFAULT_LABEL_TYPES} from "@infolks/labelmore-devkit"
import {ToolEvent, Point, PaperScope} from "paper"
import { TYPE } from "../labels/keypoint.label";

class KeypointTool extends AnnotationTool {

    public readonly name    = 'tools.medical.keypoint';
    public readonly title   = 'Medical Keypoint';
    public readonly icon    = `<i class="far fa-dot-circle"></i>`;
    public readonly cursor  = 'crosshair';

    protected options: Partial<AnnotationToolOptions> = {
        limitToArtboard: true,
        showGuide: true
    }

    constructor(protected labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(workspace, settings, paper)
    }

    onmouseup(event: ToolEvent) {

        this.labeller.add({
            type: TYPE,
            props: {
                x: event.point.x,
                y: event.point.y
            }
        })
    }


}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const keypoint = new KeypointTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(keypoint.name)) {

                        this.$tools.register(keypoint.name, keypoint)

                    }
                }
            }
        })
    }
}