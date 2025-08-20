import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
// import { findCodeBySourceMap } from './utils';
import ErrorStackParser from 'error-stack-parser'; // 解析错误堆栈，该库可将错误转换为包含调用栈信息的数组
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)


// 使用Vue提供的app.config.errorHandlerAPI捕获错误，可以打印错误对象err和组件实例vm
app.config.errorHandler = (err: any, vm: any) => {
    // console.log('Error', err)
    // console.log('VM', vm)
    const errorStack = ErrorStackParser.parse(err as Error);
    // findCodeBySourceMap(errorStack[0])
    const jsError = {
        stack_frames: errorStack,
        message: err.message,
        stack: err.stack,
        error_name: err.name,
        url: err.url,
        line: err.line,
        column: err.column
    }
    vm!.$message.error(`您触发了一个${err.name} 错误`)
    localStorage.setItem('jsErrorList', JSON.stringify(jsError))
}

app.mount('#app')
