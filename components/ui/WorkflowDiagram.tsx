// components/ui/WorkflowDiagram.tsx
import React, { useMemo, useLayoutEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MarkerType,
  Position,
  NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Diamond Node Component
const DiamondNode = React.memo(({ data }: { data: any }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} id="diamond-top" />
      <Handle type="source" position={Position.Left} id="diamond-left" />
      <Handle type="source" position={Position.Right} id="diamond-right" />
      <div
        style={{
          width: '100px',
          height: '100px',
          background: '#FFE0B2',
          border: '2px solid #E65100',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: 'rotate(-45deg)',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#E65100',
            textAlign: 'center',
            lineHeight: '1.1',
            whiteSpace: 'pre-line'
          }}
        >
          {data.label}
        </div>
      </div>
    </>
  );
});

// Custom Process Node Component
const ProcessNode = React.memo(({ data }: { data: any }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left-source" />
      <div
        style={{
          background: data.background || '#E3F2FD',
          border: data.border || '2px solid #1976D2',
          borderRadius: '8px',
          padding: '12px',
          width: '200px',
          minHeight: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '13px', lineHeight: '1.2' }}>
            {data.title}
          </div>
          {data.description && (
            <div style={{ fontSize: '11px', color: '#555', lineHeight: '1.3' }}>
              {data.description.split(' • ').map((item: string, index: number) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

// Set display names untuk debugging
DiamondNode.displayName = 'DiamondNode';
ProcessNode.displayName = 'ProcessNode';

// MEMOIZE NODE TYPES
const nodeTypes: NodeTypes = {
  diamond: DiamondNode,
  process: ProcessNode,
};

// Manual layout function
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const layoutPositions: { [key: string]: { x: number; y: number } } = {
    '1': { x: 100, y: 50 },
    '2': { x: 350, y: 50 },
    '3': { x: 600, y: 50 },
    'keputusan': { x: 725, y: 200 },
    'tidak-sesuai': { x: 500, y: 350 },
    'sesuai': { x: 950, y: 350 },
    'update': { x: 950, y: 500 }
  };

  const layoutedNodes = nodes.map((node) => ({
    ...node,
    position: layoutPositions[node.id] || { x: 0, y: 0 },
  }));

  return { nodes: layoutedNodes, edges };
};

// Definisikan props untuk komponen
interface WorkflowDiagramProps {
  language?: 'en' | 'id';
}

// Inner component
const WorkflowDiagramInner: React.FC<WorkflowDiagramProps> = ({ language = 'id' }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Initial nodes
  const initialNodes: Node[] = useMemo(() => [
    {
      id: '1',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: '1. Prasyarat Permohonan',
        description: 'Menyiapkan surat/tanda tangan • Memilih layanan FSTI via portal',
        background: '#E3F2FD',
        border: '2px solid #1976D2',
      },
    },
    {
      id: '2',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: '2. Pengisian Formulir & Submit',
        description: 'Mengisi formulir lengkap • Menekan tombol Submit',
        background: '#E3F2FD',
        border: '2px solid #1976D2',
      },
    },
    {
      id: '3',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: '3. Pemeriksaan Formulir oleh Tendik',
        description: 'Tendik memeriksa kelengkapan dan keabsahan data',
        background: '#E3F2FD',
        border: '2px solid #1976D2',
      },
    },
    {
      id: 'keputusan',
      type: 'diamond',
      position: { x: 0, y: 0 },
      data: { 
        label: 'Keputusan\nVerifikasi'
      },
    },
    {
      id: 'tidak-sesuai',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: 'Tidak Sesuai',
        description: 'Status: Perlu Perbaikan • Kembali mengisi formulir',
        background: '#FFEBEE',
        border: '2px solid #D32F2F',
      },
    },
    {
      id: 'sesuai',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: 'Sesuai',
        description: 'Status: Selesai • Dokumen dapat diunduh',
        background: '#E8F5E8',
        border: '2px solid #2E7D32',
      },
    },
    {
      id: 'update',
      type: 'process',
      position: { x: 0, y: 0 },
      data: { 
        title: '5. Permintaan Update (Opsional)',
        description: 'Jika tidak ada update dalam 2×24 jam kerja, hubungi via WhatsApp Business',
        background: '#FAFAFA',
        border: '2px dashed #757575',
      },
    },
  ], []);

  // Initial edges - PERBAIKAN HANDLE IDs
  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      sourceHandle: 'right',
      targetHandle: 'left',
      style: { stroke: '#1565C0', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1565C0', width: 25, height: 25 },
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      sourceHandle: 'right',
      targetHandle: 'left',
      style: { stroke: '#1565C0', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1565C0', width: 25, height: 25 },
    },
    {
      id: 'e3-keputusan',
      source: '3',
      target: 'keputusan',
      sourceHandle: 'bottom',
      targetHandle: 'diamond-top',
      style: { stroke: '#1565C0', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#1565C0', width: 25, height: 25 },
      type: 'smoothstep',
    },
    {
      id: 'e-keputusan-tidak',
      source: 'keputusan',
      target: 'tidak-sesuai',
      sourceHandle: 'diamond-left',
      targetHandle: 'top',
      label: 'Tidak',
      labelStyle: { fill: '#C62828', fontWeight: 'bold', fontSize: '14px' },
      labelBgStyle: { fill: 'white', fillOpacity: 0.9, stroke: '#C62828', strokeWidth: 1 },
      style: { stroke: '#C62828', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#C62828', width: 25, height: 25 },
      type: 'smoothstep',
    },
    {
      id: 'e-keputusan-sesuai',
      source: 'keputusan',
      target: 'sesuai',
      sourceHandle: 'diamond-right',
      targetHandle: 'top',
      label: 'Ya',
      labelStyle: { fill: '#2E7D32', fontWeight: 'bold', fontSize: '14px' },
      labelBgStyle: { fill: 'white', fillOpacity: 0.9, stroke: '#2E7D32', strokeWidth: 1 },
      style: { stroke: '#2E7D32', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2E7D32', width: 25, height: 25 },
      type: 'smoothstep',
    },
    {
      id: 'e-tidak-loop',
      source: 'tidak-sesuai',
      target: '2',
      sourceHandle: 'left-source', // PERBAIKI INI
      targetHandle: 'left',
      label: 'Mengisi Ulang',
      labelStyle: { fill: '#C62828', fontWeight: 'bold', fontSize: '12px' },
      labelBgStyle: { fill: '#FFEBEE', fillOpacity: 0.9, stroke: '#C62828', strokeWidth: 1 },
      style: { stroke: '#C62828', strokeWidth: 3, strokeDasharray: '8,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#C62828', width: 25, height: 25 },
      type: 'smoothstep',
      animated: true,
    },
    {
      id: 'e-sesuai-update',
      source: 'sesuai',
      target: 'update',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      label: 'Opsional',
      labelStyle: { fill: '#424242', fontWeight: 'bold', fontSize: '12px' },
      labelBgStyle: { fill: '#F5F5F5', fillOpacity: 0.9, stroke: '#424242', strokeWidth: 1 },
      style: { stroke: '#424242', strokeWidth: 3, strokeDasharray: '10,5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#424242', width: 25, height: 25 },
    },
  ], []);

  useLayoutEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 100);
  }, [initialNodes, initialEdges, fitView]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.4}
        maxZoom={1.2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background color="#f8fafc" gap={16} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

// Main component
const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ language = 'id' }) => {
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white" style={{ height: '650px' }}>
      <div style={{ 
        background: 'linear-gradient(90deg, #E3F2FD 0%, #F3E5F5 100%)',
        padding: '16px',
        borderBottom: '1px solid #E0E0E0'
      }}>
        <h1 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#1F2937', 
          textAlign: 'center',
          margin: 0 
        }}>
          Alur Permohonan Layanan FSTI
        </h1>
      </div>
      
      <div style={{ height: '550px' }}>
        <ReactFlowProvider>
          <WorkflowDiagramInner language={language} />
        </ReactFlowProvider>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        padding: '12px', 
        fontSize: '14px', 
        color: '#6B7280', 
        borderTop: '1px solid #E0E0E0',
        background: '#F9FAFB'
      }}>
        Alur Proses Permohonan Layanan FSTI - Layout manual terstruktur
      </div>
    </div>
  );
};

export default WorkflowDiagram;