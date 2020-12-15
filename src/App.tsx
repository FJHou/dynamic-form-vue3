import { defineComponent, Ref, ref, reactive, watchEffect } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { SchemaForm } from '../lib'
import demos from './demos'
import './style/app.scss'
function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: '',
}

type Schema = any
type UISchema = any

export default defineComponent({
  name: 'App',

  setup() {
    const selectedRef: Ref<any> = ref(0)
    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate?: any
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })

    const handleCodeChange = (
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) => {
      try {
        const json = JSON.parse(value)

        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        console.log(err)
      }
      // demo.schema = schema
    }
    const handleSchemaChange = (v: any) => handleCodeChange('schema', v)
    const handleSchemaFormChange = (v: any) => {
      console.log(v)
    }

    return () => {
      const code = toJson(demo.schema)

      return (
        <div class="play-ground">
          <div class="schema-section">
            <MonacoEditor
              code={code}
              onChange={handleSchemaChange}
              title="schema"
            ></MonacoEditor>
          </div>

          <div class="result-section">
            <SchemaForm
              schema={demo.schema}
              onChange={handleSchemaFormChange}
              value={demo.data}
            ></SchemaForm>
          </div>
        </div>
      )
    }
  },
})
