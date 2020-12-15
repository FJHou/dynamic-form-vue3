import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'StringFeilds',

  props: FieldPropsDefine,

  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e)
    }

    return () => {
      return (
        <div>
          <input type="text" onInput={handleChange} />
        </div>
      )
    }
  },
})
