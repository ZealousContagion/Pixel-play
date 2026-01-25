"use client"

import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Image as ImageIcon, CheckCircle2, X } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
    onImageLoad: (url: string) => void
    currentImage: string | null
}

export function ImageUploader({ onImageLoad, currentImage }: ImageUploaderProps) {
    const [fileName, setFileName] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                onImageLoad(result)
                setFileName(file.name)
            }
            reader.readAsDataURL(file)
        }
    }, [onImageLoad])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 
            'image/svg+xml': ['.svg'],
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/webp': ['.webp']
        },
        multiple: false
    })

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        onImageLoad("")
        setFileName(null)
    }

    return (
        <div className="space-y-4">
            <div 
                {...getRootProps()} 
                className={`relative h-full min-h-[140px] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 text-center cursor-pointer
                    ${isDragActive ? "border-primary bg-primary/10" : "border-border/40 hover:border-primary/40 bg-muted/5"}
                `}
            >
                <input {...getInputProps()} />
                
                {currentImage ? (
                    <div className="relative group w-full h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-16 h-16 bg-white/10 flex items-center justify-center border border-border/20 overflow-hidden">
                            <Image src={currentImage} alt="Preview" width={64} height={64} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-mono uppercase text-primary tracking-widest flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Ready_For_Render
                            </p>
                            {fileName && <p className="text-[10px] font-bold truncate max-w-[150px] opacity-60">{fileName}</p>}
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute -top-2 -right-2 h-6 w-6 bg-background border border-border/40 rounded-none hover:bg-accent hover:text-white"
                            onClick={clearImage}
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-none border border-border/40 mx-auto flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase italic tracking-tighter">Logo_Ingestion.sys</p>
                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                                SVG, PNG, or JPG <br /> Drag & Drop to initialize
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground uppercase tracking-tighter">
                <span>Format: VECTOR/RASTER</span>
                <span>Max: 5MB</span>
            </div>
        </div>
    )
}
