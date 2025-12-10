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
                    console.error(error);
                    alert('Upload failed');
                    setUploading(false);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    onChange([...images, downloadURL]);
                    setUploading(false);
                }
            );
        } catch (err) {
            console.error(err);
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

            <label className={`cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 inline-flex items-center gap-2 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploading ? `Uploading ${Math.round(progress)}%` : 'Upload Image'}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                />
            </label>
        </div>
    );
}
