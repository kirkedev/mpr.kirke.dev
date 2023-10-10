declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.svelte" {
    import type { ComponentType } from "svelte";
    const component: ComponentType;
    export default component;
}
