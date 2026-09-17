"use client";

import { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import type { DiagramEdge, DiagramNode } from "@/lib/data";

const COL_WIDTH = 210;
const ROW_HEIGHT = 130;

function FlowNode({ data, selected }: NodeProps<{ label: string; sublabel: string }>) {
  return (
    <div
      className={`w-[172px] rounded-xl border px-3.5 py-3 text-left shadow-md transition-all duration-200 ${
        selected
          ? "border-accent-blue bg-accent-blue/10 shadow-accent-blue/20"
          : "border-surface-border bg-surface/90 hover:border-accent-blue/60"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-accent-blue !border-none !h-2 !w-2" />
      <div className="text-[10px] font-medium uppercase tracking-wide text-accent-cyan">
        {data.sublabel}
      </div>
      <div className="mt-1 text-sm font-semibold leading-snug text-foreground">
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-accent-violet !border-none !h-2 !w-2" />
    </div>
  );
}

const nodeTypes = { flow: FlowNode };

export function ArchitectureDiagram({
  nodes: dataNodes,
  edges: dataEdges,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const nodes: Node[] = useMemo(
    () =>
      dataNodes.map((n) => ({
        id: n.id,
        type: "flow",
        position: { x: n.col * COL_WIDTH, y: n.row * ROW_HEIGHT },
        data: { label: n.label, sublabel: n.sublabel },
        selected: n.id === activeId,
        draggable: false,
      })),
    [dataNodes, activeId]
  );

  const edges: Edge[] = useMemo(
    () =>
      dataEdges.map((e) => ({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        animated: false,
        className: "flow-edge",
        style: { stroke: "var(--accent-blue)", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-blue)", width: 16, height: 16 },
      })),
    [dataEdges]
  );

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setActiveId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const active = dataNodes.find((n) => n.id === activeId);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[300px] w-full overflow-hidden rounded-2xl border border-surface-border bg-background-elevated sm:h-[340px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag
          minZoom={0.5}
          maxZoom={1.5}
          className="architecture-flow"
          aria-label="Interactive architecture diagram — click a node for details"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--grid-line)" />
        </ReactFlow>
      </div>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-xl px-4 py-3.5"
          >
            <div className="text-xs font-medium uppercase tracking-wide text-accent-cyan">
              {active.sublabel}
            </div>
            <div className="mt-0.5 text-sm font-semibold text-foreground">{active.label}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{active.detail}</p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-1 text-sm text-foreground-subtle"
          >
            Click any node above to see what it does.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
