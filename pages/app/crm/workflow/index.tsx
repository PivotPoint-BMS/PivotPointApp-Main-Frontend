/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useRef, useState } from 'react'
// reactflow
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Connection,
  Edge,
  ReactFlowInstance,
  MarkerType,
  Controls,
  NodeTypes,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Node,
} from 'reactflow'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// sections
import Sidebar from './SideBar'
// components
import TriggerNode, { TriggerNodeData } from './TriggerNode'
import ActionNode, { ActionNodeData } from './ActionNode'
import 'reactflow/dist/style.css'

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
}

let id = 3
// eslint-disable-next-line no-plusplus
const getId = () => `dndnode_${id++}`

const index = () => {
  const isDesktop = useResponsive('md', 'up')
  const { t } = useTranslate()
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<ActionNodeData | TriggerNodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<null>([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
    unknown,
    unknown
  > | null>(null)

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: MarkerType.ArrowClosed, type: 'smoothstep' }, eds)
      ),
    [setEdges]
  )

  const onDragOver = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { dropEffect: string } }) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },
    []
  )

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void
      dataTransfer: { getData: (arg0: string) => string }
      clientX: number
      clientY: number
    }) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect()
      const nodeType = event.dataTransfer.getData('reactflow/nodeType')
      const name = event.dataTransfer.getData('reactflow/name')
      const type = event.dataTransfer.getData('reactflow/type')
      const icon = event.dataTransfer.getData('reactflow/icon')

      // check if the dropped element is valid
      if (typeof nodeType === 'undefined' || !nodeType) {
        return
      }
      if (reactFlowBounds && reactFlowInstance) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })
        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { name, icon, type },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [reactFlowInstance]
  )

  const onNodesDelete = useCallback(
    (deleted: Node<ActionNodeData | TriggerNodeData, string | undefined>[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges)
          const outgoers = getOutgoers(node, nodes, edges)
          const connectedEdges = getConnectedEdges([node], edges)

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge))

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          )

          return [...remainingEdges, ...createdEdges]
        }, edges)
      )
    },
    [nodes, edges]
  )

  return (
    <div className='flex h-full w-full flex-1 sm:flex-row'>
      {isDesktop ? (
        <ReactFlowProvider>
          <div className='h-full flex-1' ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onInit={setReactFlowInstance}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodesDelete={onNodesDelete}
              onConnect={onConnect}
              fitView
              snapGrid={[25, 25]}
              snapToGrid
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeDoubleClick={(e, node) => console.log(node)}
              className='bg-gray-100'
            >
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      ) : (
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-xl font-semibold text-red-500'>
            {t('Sorry, Workflow only works on desktop')}
          </h1>
        </div>
      )}
    </div>
  )
}

export default index
