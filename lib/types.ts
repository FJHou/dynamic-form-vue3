import { PropType } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type: SchemaTypes
  const?: any
  format?: string
  default?: any
  properties?: {
    [key: string]: Schema | SchemaRef
  }
  items?: Schema | Schema[] | SchemaRef
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionanlProperties?: any
  additionalItems?: Schema
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },

  value: {
    required: true,
  },

  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const
