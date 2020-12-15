import { defineComponent } from 'vue'
import { SchemaTypes, FieldPropsDefine } from './types'
import { StringFeilds, NumberFeilds } from './fields'

export default defineComponent({
  name: 'SchemaItem',

  props: FieldPropsDefine,

  setup(props) {
    return () => {
      const { schema } = props
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringFeilds
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberFeilds
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props}></Component>
    }
  },
})
