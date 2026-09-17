"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
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
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { DiagramEdge, DiagramNode } from "@/lib/data";

const COL_WIDTH = 210;
const ROW_HEIGHT = 130;

function FlowNode({ data, selected }: NodeProps<{ label: string; sublabel: string; pulsing: boolean }>) {
  return (
    <div
      className={`w-[172px] rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
        selected
          ? "border-accent-blue bg-accent-blue/10"
          : data.pulsing
            ? "border-accent-cyan/70 bg-accent-cyan/5"
            : "border-surface-border/70 bg-surface/60 hover:border-accent-blue/50"
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
  const [pulseIndex, setPulseIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-10% 0px -10% 0px" });

  const orderedIds = useMemo(
    () => [...dataNodes].sort((a, b) => a.col - b.col || a.row - b.row).map((n) => n.id),
    [dataNodes]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !inView) return;
    const id = setInterval(() => {
      setPulseIndex((i) => (i + 1) % (orderedIds.length + 2));
    }, 650);
    return () => clearInterval(id);
  }, [orderedIds.length, inView]);

  const pulsingNodeId = orderedIds[pulseIndex];

  const nodes: Node[] = useMemo(
    () =>
      dataNodes.map((n) => ({
        id: n.id,
        type: "flow",
        position: { x: n.col * COL_WIDTH, y: n.row * ROW_HEIGHT },
        data: { label: n.label, sublabel: n.sublabel, pulsing: n.id === pulsingNodeId },
        selected: n.id === activeId,
        draggable: false,
      })),
    [dataNodes, activeId, pulsingNodeId]
  );

  const edges: Edge[] = useMemo(
    () =>
      dataEdges.map((e) => ({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        animated: false,
        className: "flow-edge",
        style: { stroke: "var(--accent-blue)", strokeWidth: 1.5, opacity: 0.6 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-blue)", width: 14, height: 14 },
      })),
    [dataEdges]
  );

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setActiveId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const active = dataNodes.find((n) => n.id === activeId);

  return (
    <div ref={wrapRef} className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      <div className="h-[280px] w-full overflow-hidden rounded-2xl border border-surface-border/60 bg-background-elevated/40 sm:h-[320px] lg:flex-1">
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

      <div className="lg:w-64 lg:shrink-0">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-l-2 border-accent-blue py-1 pl-4"
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
              className="border-l-2 border-surface-border py-1 pl-4 text-sm text-foreground-subtle"
            >
              Click any node to see what it does. The highlighted node shows the request moving through the system.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
