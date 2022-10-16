import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { WithChildren } from '../lib/types/withChildren.type'

type LoaderProps = WithChildren<{ loading: boolean }>

export default function Loader({ loading, children = [] }: LoaderProps) {
  if (!loading) {
    return <React.Fragment>{children}</React.Fragment>
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '4rem',
      }}
    >
      <LoadingOutlined style={{ fontSize: 48 }} spin />
    </div>
  )
}
