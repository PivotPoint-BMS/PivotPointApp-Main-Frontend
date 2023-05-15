import React from 'react'
import { BaseEdge, EdgeLabelRenderer, EdgeProps, MarkerType, getBezierPath } from 'reactflow'
import IconButton from 'components/IconButton'
import { Icon } from '@iconify/react'

const onEdgeClick = (evt, id) => {
  evt.stopPropagation()
  alert(`remove ${id}`)
}

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={MarkerType.ArrowClosed} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
        >
          <IconButton
            className='border border-primary-600 bg-gray-100 !p-1 !text-primary-600 hover:!bg-primary-100'
            onClick={(event) => onEdgeClick(event, id)}
          >
            <Icon icon='ic:round-add' height={18} />
          </IconButton>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
