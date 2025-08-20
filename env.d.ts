// env.d.ts 或 shims-vue.d.ts
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // 让 TS 识别 .vue 文件导出的组件类型
    const component: DefineComponent<{}, {}, any>
    export default component
}
