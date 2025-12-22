'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        // Check if we already have 2 images
        if (images.length >= 2) {
            alert('Maximum 2 images allowed per product');
            e.target.value = ''; // Reset input
            return;
        }

        setUploading(true);
        setProgress(0);
        const file = e.target.files[0];
        const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const storageRef = ref(storage, `products/${filename}`);

        try {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(p);
                },
                (error) => {
                    alert('Upload failed');
                    setUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const newImages = [...images, downloadURL].slice(0, 2); // Ensure max 2
                    onChange(newImages);
                    setUploading(false);
                }
            );
        } catch (err) {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-4">
                {images.map((url, idx) => (
                    <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden group">
                        <img src={url} alt="Product" className="object-cover w-full h-full bg-gray-50" />
                        <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>

            <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 inline-flex items-center gap-2 ${uploading || images.length >= 2 ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploading ? `Uploading ${Math.round(progress)}%` : images.length >= 2 ? 'Maximum 2 images reached' : 'Upload Image'}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading || images.length >= 2}
                />
            </label>
            {images.length < 2 && (
                <p className="text-sm text-gray-500 mt-2">
                    {images.length === 0 ? 'Upload up to 2 images (0/2)' : `Upload up to 2 images (${images.length}/2)`}
                </p>
            )}
        </div>
    );
}
