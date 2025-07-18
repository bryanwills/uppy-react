// This file was generated by build-components.mjs
// ANY EDITS WILL BE OVERWRITTEN!

import {
  type DropzoneProps,
  Dropzone as PreactDropzone,
} from '@uppy/components'
import { h as preactH } from 'preact'
import { render as preactRender } from 'preact/compat'
import { createElement as h, useContext, useEffect, useRef } from 'react'
import { UppyContext } from '../UppyContextProvider.js'

export default function Dropzone(props: Omit<DropzoneProps, 'ctx'>) {
  const ref = useRef(null)
  const ctx = useContext(UppyContext)

  useEffect(() => {
    if (ref.current) {
      preactRender(
        preactH(PreactDropzone, {
          ...props,
          ctx,
        } satisfies DropzoneProps),
        ref.current,
      )
    }
  }, [ctx, props])

  return <div ref={ref} />
}
