import { SimpleLabelType, BasicLabelTypeOptions, Label, Control } from "@infolks/labelmore-devkit";
import { Path } from "paper";
export declare const TYPE = "types.medical.keypoint";
export declare class KeypointLabel extends SimpleLabelType {
    readonly title = "Keypoint";
    readonly name = "types.medical.keypoint";
    readonly options: Partial<BasicLabelTypeOptions>;
    vectorize(label: Label): paper.PathItem;
    controls(path: Path): Control[];
    apply(path: Path): any;
}
declare const _default: {
    install(Vue: any, opts: any): void;
};
export default _default;
