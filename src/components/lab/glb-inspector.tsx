"use client"

import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileCode, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GLBInspectorProps {
    onModelLoad: (url: string) => void
}

export function GLBInspector({ onModelLoad }: GLBInspectorProps) {
    const [fileName, setFileName] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setFileName(file.name)
            onModelLoad(url)
        }
    }, [onModelLoad])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'model/gltf-binary': ['.glb'] },
        multiple: false
    })

    return (
        <div 
            {...getRootProps()} 
            className={`h-full border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center cursor-pointer
                ${isDragActive ? "border-primary bg-primary/10" : "border-border/40 hover:border-primary/40 bg-muted/5"}
            `}
        >
            <input {...getInputProps()} />
            
            {fileName ? (
                <div className="space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Active_Model</p>
                        <p className="text-sm font-bold truncate max-w-[200px] italic uppercase">{fileName}</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-none border border-border/40 mx-auto flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase italic tracking-tighter">Asset_Inspector.exe</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                            Drag & Drop your .GLB file <br /> to verify rendering pipeline
                        </p>
                    </div>
                </div>
            )}
            
            <Badge variant="outline" className="mt-6 rounded-none font-mono text-[9px] border-primary/20">
                MAX_SIZE: 50MB
            </Badge>
        </div>
    )
}
