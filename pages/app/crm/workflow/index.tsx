/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useStoreApi,
  Connection,
  Edge,
  ReactFlowInstance,
  MarkerType,
  Controls,
} from 'reactflow'
import TriggerNode from './TriggerNode'
import ActionNode from './ActionNode'
import ButtonEdge from './AddEdge'
import Sidebar from './SideBar'
import 'reactflow/dist/style.css'

const MIN_DISTANCE = 150

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
}

const edgeTypes = {
  buttonedge: ButtonEdge,
}

let id = 3
// eslint-disable-next-line no-plusplus
const getId = () => `dndnode_${id++}`

const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const store = useStoreApi()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
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

  const getClosestEdge = useCallback(
    (node: { id: string; positionAbsolute: { x: number; y: number } }) => {
      const { nodeInternals } = store.getState()
      const storeNodes = Array.from(nodeInternals.values())

      const closestNode = storeNodes.reduce(
        (res, n) => {
          if (n.id !== node.id) {
            const dx = n.positionAbsolute.x - node.positionAbsolute.x
            const dy = n.positionAbsolute.y - node.positionAbsolute.y
            const d = Math.sqrt(dx * dx + dy * dy)

            if (d < res.distance && d < MIN_DISTANCE) {
              res.distance = d
              res.node = n
            }
          }

          return res
        },
        {
          distance: Number.MAX_VALUE,
          node: null,
        }
      )

      if (!closestNode.node) {
        return null
      }

      const closeNodeIsSource = closestNode.node.positionAbsolute.x < node.positionAbsolute.x

      return {
        id: `${node.id}-${closestNode.node.id}`,
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
      }
    },
    []
  )

  const onNodeDrag = useCallback(
    (_: any, node: any) => {
      const closeEdge = getClosestEdge(node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (
          closeEdge &&
          !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)
        ) {
          closeEdge.className = 'temp'
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [getClosestEdge, setEdges]
  )

  const onNodeDragStop = useCallback(
    (_: any, node: any) => {
      const closeEdge = getClosestEdge(node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (closeEdge) {
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [getClosestEdge]
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

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds?.left || 0,
        y: event.clientY - reactFlowBounds?.top || 0,
      })
      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: { name, icon, type },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  return (
    <div className='h-full flex-1' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        fitView
        snapGrid={[25, 25]}
        snapToGrid
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={(e, node) => console.log(node)}
        className='bg-gray-100'
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default () => (
  <div className='flex h-full w-full flex-1 sm:flex-row'>
    <ReactFlowProvider>
      <Flow />
      <Sidebar />
    </ReactFlowProvider>
  </div>
)
