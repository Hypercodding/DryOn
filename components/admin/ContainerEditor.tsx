'use client';

import { useState, useEffect } from 'react';
import ContainerVisualizer from '@/components/ContainerVisualizer';

export default function ContainerEditor({ pointsJson, onChange, imageUrl }: { pointsJson: string, onChange: (v: string) => void, imageUrl: string | null }) {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        try {
            setPoints(JSON.parse(pointsJson) || []);
        } catch (e) {
            setPoints([]);
        }
    }, [pointsJson]);

    const handlePointsChange = (newPoints: any[]) => {
        setPoints(newPoints as any);
        onChange(JSON.stringify(newPoints));
    };

    if (!imageUrl) {
        return <div className="p-8 text-center bg-gray-100 rounded text-gray-500 italic">Please upload and save an image first.</div>;
    }

    return (
        <div>
            <ContainerVisualizer
                points={points}
                onChange={handlePointsChange}
                editable={true}
                imageUrl={imageUrl}
            />
            <p className="text-xs text-gray-400 mt-2">
                {points.length} points active. Click on the image to add a point.
            </p>
        </div>
    );
}
