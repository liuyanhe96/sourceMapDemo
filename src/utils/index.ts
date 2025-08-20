import axios  from 'axios';
import sourceMap from 'source-map';
// 工具函数：在utils目录下创建工具函数处理source map关联逻辑

// 核心库：使用mozilla的source-map库（版本0.7.4）实现源码定位
// 功能原理：通过打包后的map文件反推源代码位置，需要行号和列号精确定位

// 方法定义：通过定义getSourceMap方法来获取map文件内容，该方法接收一个URL参数
// 实现方式：使用axios发送GET请求获取map文件内容，并返回响应结果
// 调用方式：在其他方法中直接调用getSourceMap方法即可获取map文件
const getSourceMap = async (url: string) => {
    return await axios.get(url)
}

// stackFrame.fileName 就是报错的Js代码，需要根据这个Js 获取到对应的source-map
// 通过axios请求部署在服务器上的map文件
// 使用source-map库建立源码与编译后代码的映射关系
// 根据错误堆栈中的行列号定位原始出错位置
const findCodeBySourceMap = async (stackFrame: any) => {
    const sourceData: any = await getSourceMap(stackFrame.fileName + '.map')
    const fileContent = sourceData.data
    // 解析map文件
    const consumer = await new sourceMap.SourceMapConsumer(fileContent);

    // 通过报错位置查找到对应的源文件名称以及报错行数
    // 接收包含line和column属性的对象参数，返回原始源代码的位置信息。
    const originalPosition = consumer.originalPositionFor({
        line: stackFrame.lineNumber,
        column: stackFrame.columnNumber
    })
    // 那么就可以通过 sourceContentFor 这个方法找到报错的源代码 通过该方法能够获取到真实的错误代码，可以配合console.log输出还原后的源代
    const code = consumer.sourceContentFor(originalPosition.source!)
    console.log(code, '还原之后的 code')

}

export { findCodeBySourceMap }
