/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useRef, useState } from 'react'
// next
import Head from 'next/head'
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
// routes
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
// layout
import Layout from 'layout/Index'
// components
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
// sections
import WorkflowSidebar from 'sections/dashboard/workflow/WorkflowSidebar'
import TriggerNode, { TriggerNodeData } from 'sections/dashboard/workflow/TriggerNode'
import ActionNode, { ActionNodeData } from 'sections/dashboard/workflow/ActionNode'
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
    <>
      <Head>
        <title>{t('Workflow')} | Pivot Point BMS</title>
      </Head>
      {isDesktop ? (
        <div className='w-full flex-col'>
          <div className='px-5'>
            <HeaderBreadcrumbs heading={t('Workflow')} />
          </div>
          <div className='flex h-full max-h-[570px]'>
            <ReactFlowProvider>
              <div className='w-full' ref={reactFlowWrapper}>
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
                  className='bg-gray-100 dark:bg-paper-dark-contrast'
                >
                  <Controls />
                </ReactFlow>
              </div>
              <WorkflowSidebar />
            </ReactFlowProvider>
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <h1 className='text-center text-xl font-semibold text-red-500'>
            {t('Sorry, Workflow only works on desktop')}
          </h1>
        </div>
      )}
    </>
  )
}

index.getLayout = function getLayout(page: JSX.Element) {
  return <Layout variant='dashboard'>{page}</Layout>
}

export default index
