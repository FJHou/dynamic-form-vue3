import { defineComponent, PropType, shallowRef, ref, onMounted } from 'vue'
import * as Monaco from 'monaco-editor'
import './style/index.scss'

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => any
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    const editorRef = shallowRef()
    const containerRef = ref()

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          // theme: 'vs-dark',
          minimap: {
            enabled: false,
          },
        },
      ))

      editor.onDidChangeModelContent(e => {
        const code = editor.getValue()
        props.onChange(code, e)
      })
    })

    return () => {
      return (
        <div class="monaco-editor-wrapper">
          <h4 class="title">{props.title}</h4>
          <div ref={containerRef} class="container"></div>
        </div>
      )
    }
  },
})
