<template>
  <div class="pre-code">
    <div class="error-detail">
      <pre class="error-code" v-html="preLine()"></pre>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps({
  origin: {
    type: Object,
    default: ''
  },
});

// 转义编码html
const encodeHTML = (str: any) => {
  if (!str || str.length === 0) return ''
  return str
      .replace(/&/g, '&#38;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
}

const preLine = () => {
  // 错误的行数
  const line = props.origin.line
  // 先获取源码有多少行
  const originCodeLine = props.origin.source.split('\n')
  const len = originCodeLine.length - 1
  const start = line - 3 >= 0 ? line - 3 : 0
  const end = start + 5 >= len ? len : start + 5 // 最多展示6行
  let newLines = []
  for (let i = start; i <= end; i++) {
    const content = i + 1 + '.    ' + encodeHTML(originCodeLine[i])
    newLines.push(
        `<div class='code-line ${i + 1 === line ? 'heightlight' : ''}'>${content}</div>`
    )
  }
  return newLines.join('')
}

</script>
<style>
.error-code {
  padding: 10px;
  overflow: hidden;
  font-family: consolas, monospace;
  word-wrap: normal;
}
.code-line {
  padding: 4px;
}
.heightlight {
  color: #fff;
  background: #f12926;
}
</style>
