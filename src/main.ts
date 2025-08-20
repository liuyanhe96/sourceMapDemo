import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { findCodeBySourceMap } from './utils';
import ErrorStackParser from 'error-stack-parser'; // 解析错误堆栈，该库可将错误转换为包含调用栈信息的数组

const app = createApp(App)
app.use(router)


// 使用Vue提供的app.config.errorHandlerAPI捕获错误，可以打印错误对象err和组件实例vm
app.config.errorHandler = (err, vm) => {
    // console.log('Error', err)
    // console.log('VM', vm)
    const errorStack = ErrorStackParser.parse(err as Error);
    findCodeBySourceMap(errorStack[0])
    console.log('stackFrames', errorStack, 'VM', vm)
}

app.mount('#app')
