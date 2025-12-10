'use client';

import { useState, useRef, useEffect } from 'react';
import { MousePointer2, X, Plus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Point {
    id: string;
    x: number;
    y: number;
    title?: string;
    description?: string;
    actionLabel?: string;
    actionUrl?: string;
    type?: 'pole' | 'desiccant' | 'damage';
}

interface ContainerVisualizerProps {
    points: Point[];
    onChange?: (points: Point[]) => void;
    editable?: boolean;
    imageUrl?: string | null;
}

export default function ContainerVisualizer({ points, onChange, editable = false, imageUrl }: ContainerVisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
    const [editingPoint, setEditingPoint] = useState<Point | null>(null);

    // Fallback if no image
    if (!imageUrl) {
        return <div className="bg-gray-100 rounded border border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-500">No image available</div>;
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!editable || !onChange || !containerRef.current || editingPoint) return;
        // If clicking on a point, don't create new one (handled by stopPropagation on point)

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newPoint: Point = {
            id: Math.random().toString(36).substr(2, 9),
            x,
            y,
            type: 'desiccant'
        };

        setEditingPoint(newPoint); // Open editor immediately
    };

    const handleSavePoint = (point: Point) => {
        if (!onChange) return;

        const exists = points.find(p => p.id === point.id);
        if (exists) {
            onChange(points.map(p => p.id === point.id ? point : p));
        } else {
            onChange([...points, point]);
        }
        setEditingPoint(null);
    };

    const handleRemove = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!editable || !onChange) return;
        onChange(points.filter(p => p.id !== id));
        if (editingPoint?.id === id) setEditingPoint(null);
    };

    return (
        <div className="relative w-full rounded border border-gray-300 overflow-hidden bg-gray-50 max-w-4xl mx-auto group">
            {/* Image Layer used as coordinate system */}
            <div
                ref={containerRef}
                className={`relative w-full ${editable ? 'cursor-crosshair' : ''}`}
                onClick={handleClick}
            >
                <img
                    src={imageUrl}
                    alt="Container Map"
                    className="w-full h-auto block select-none"
                    draggable={false}
                />

                {/* Points Overlay */}
                {points.map((p) => (
                    <div
                        key={p.id}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                        onMouseEnter={() => setHoveredPoint(p.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (editable) setEditingPoint(p);
                        }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            className={`w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-colors ${p.type === 'damage' ? 'bg-red-500' : 'bg-teal-500'
                                }`}
                        >
                            {!editable && hoveredPoint === p.id && (
                                <div className="absolute top-full mt-2 w-48 bg-black/90 text-white text-xs p-3 rounded z-50 text-left shadow-lg">
                                    {p.title && <strong className="block mb-1 text-teal-400 font-bold text-sm">{p.title}</strong>}
                                    {p.description && <p className="mb-2 leading-relaxed">{p.description}</p>}
                                    {p.actionLabel && p.actionUrl && (
                                        <a
                                            href={p.actionUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-teal-500 hover:bg-teal-400 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {p.actionLabel}
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.button>

                        {/* Editor Delete Button */}
                        {editable && (
                            <button
                                onClick={(e) => handleRemove(e, p.id)}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={10} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Edit Modal / Popover */}
            <AnimatePresence>
                {editingPoint && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing/adding when clicking bg? actually maybe allow close
                    >
                        <div className="bg-white p-6 rounded shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                            <h3 className="text-lg font-bold mb-4">{editingPoint.title ? 'Edit Point' : 'New Point'}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                                    <input
                                        className="w-full border p-2 rounded text-sm"
                                        placeholder="e.g. Moisture Build-up"
                                        value={editingPoint.title || ''}
                                        onChange={e => setEditingPoint({ ...editingPoint, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                    <textarea
                                        className="w-full border p-2 rounded text-sm h-20"
                                        placeholder="Describe the issue or solution..."
                                        value={editingPoint.description || ''}
                                        onChange={e => setEditingPoint({ ...editingPoint, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Action Label</label>
                                        <input
                                            className="w-full border p-2 rounded text-sm"
                                            placeholder="Label"
                                            value={editingPoint.actionLabel || ''}
                                            onChange={e => setEditingPoint({ ...editingPoint, actionLabel: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Action URL</label>
                                        <input
                                            className="w-full border p-2 rounded text-sm"
                                            placeholder="https://..."
                                            value={editingPoint.actionUrl || ''}
                                            onChange={e => setEditingPoint({ ...editingPoint, actionUrl: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    onClick={() => setEditingPoint(null)}
                                    className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSavePoint(editingPoint)}
                                    className="px-4 py-2 text-sm font-bold bg-navy text-white rounded hover:bg-navy-light"
                                >
                                    Save Point
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint Overlay */}
            {editable && !editingPoint && (
                <div className="absolute top-2 right-2 bg-white/80 p-2 rounded text-xs text-navy font-bold shadow-sm pointer-events-none">
                    Click to add point
                </div>
            )}
        </div>
    );
}
