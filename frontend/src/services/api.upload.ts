import { httpClient } from './http'
import type { ApiResponse } from '@/types'

export interface UploadedFile {
  id: string
  name: string
  originalName: string
  url: string
  size: number
  type: string
  mimeType: string
  extension: string
  uploadedAt: string
  uploadedBy: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface UploadOptions {
  maxSize?: number // en bytes
  allowedTypes?: string[]
  compress?: boolean
  quality?: number // pour les images
  resize?: {
    width?: number
    height?: number
    maintainAspectRatio?: boolean
  }
}

export const uploadApi = {
  // Upload d'un fichier simple
  async uploadFile(
    file: File, 
    options?: UploadOptions
  ): Promise<ApiResponse<UploadedFile>> {
    // Validation du fichier
    const validation = this.validateFile(file, options)
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error || 'Fichier invalide'
      }
    }

    // Traitement du fichier si nécessaire
    const processedFile = await this.processFile(file, options)
    
    return httpClient.upload<UploadedFile>('/upload/file', processedFile)
  },

  // Upload d'un avatar
  async uploadAvatar(
    file: File, 
    userId: string,
    options?: UploadOptions
  ): Promise<ApiResponse<UploadedFile>> {
    // Validation spécifique pour les avatars
    const avatarOptions: UploadOptions = {
      maxSize: 5 * 1024 * 1024, // 5MB max
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      compress: true,
      quality: 0.8,
      resize: {
        width: 400,
        height: 400,
        maintainAspectRatio: true
      },
      ...options
    }

    const validation = this.validateFile(file, avatarOptions)
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error || 'Fichier invalide pour l\'avatar'
      }
    }

    // Traitement du fichier
    const processedFile = await this.processFile(file, avatarOptions)
    
    const formData = new FormData()
    formData.append('file', processedFile)
    formData.append('userId', userId)
    formData.append('type', 'avatar')

    return httpClient.post<UploadedFile>('/upload/avatar', formData)
  },

  // Upload d'un document
  async uploadDocument(
    file: File, 
    type: string,
    metadata?: Record<string, any>,
    options?: UploadOptions
  ): Promise<ApiResponse<UploadedFile>> {
    // Validation spécifique pour les documents
    const documentOptions: UploadOptions = {
      maxSize: 20 * 1024 * 1024, // 20MB max
      allowedTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/webp'
      ],
      ...options
    }

    const validation = this.validateFile(file, documentOptions)
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error || 'Document invalide'
      }
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata))
    }

    return httpClient.post<UploadedFile>('/upload/document', formData)
  },

  // Upload d'images pour la galerie
  async uploadGalleryImages(
    files: File[], 
    galleryId: string,
    options?: UploadOptions
  ): Promise<ApiResponse<UploadedFile[]>> {
    // Validation des fichiers
    for (const file of files) {
      const validation = this.validateFile(file, {
        maxSize: 10 * 1024 * 1024, // 10MB max
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        compress: true,
        quality: 0.9,
        ...options
      })
      
      if (!validation.isValid) {
        return {
          success: false,
          message: `Fichier invalide: ${file.name} - ${validation.error}`
        }
      }
    }

    // Traitement des fichiers
    const processedFiles = await Promise.all(
      files.map(file => this.processFile(file, options))
    )

    const formData = new FormData()
    processedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    formData.append('galleryId', galleryId)

    return httpClient.post<UploadedFile[]>('/upload/gallery', formData)
  },

  // Upload de pièces jointes pour les messages
  async uploadMessageAttachments(
    files: File[], 
    messageId: string,
    options?: UploadOptions
  ): Promise<ApiResponse<UploadedFile[]>> {
    // Validation des fichiers
    for (const file of files) {
      const validation = this.validateFile(file, {
        maxSize: 15 * 1024 * 1024, // 15MB max
        allowedTypes: [
          'image/jpeg', 'image/png', 'image/webp', 'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain'
        ],
        ...options
      })
      
      if (!validation.isValid) {
        return {
          success: false,
          message: `Fichier invalide: ${file.name} - ${validation.error}`
        }
      }
    }

    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    formData.append('messageId', messageId)

    return httpClient.post<UploadedFile[]>('/upload/message-attachments', formData)
  },

  // Supprimer un fichier
  async deleteFile(fileId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/upload/files/${fileId}`)
  },

  // Récupérer les informations d'un fichier
  async getFileInfo(fileId: string): Promise<ApiResponse<UploadedFile>> {
    return httpClient.get<UploadedFile>(`/upload/files/${fileId}`)
  },

  // Récupérer les fichiers d'un utilisateur
  async getUserFiles(
    userId: string, 
    type?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<{
    files: UploadedFile[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }>> {
    const params = new URLSearchParams({
      userId,
      page: page.toString(),
      limit: limit.toString()
    })

    if (type) {
      params.append('type', type)
    }

    return httpClient.get<{
      files: UploadedFile[]
      pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
      }
    }>(`/upload/user-files?${params.toString()}`)
  },

  // Validation d'un fichier
  validateFile(file: File, options?: UploadOptions): { isValid: boolean; error?: string } {
    // Vérifier la taille
    if (options?.maxSize && file.size > options.maxSize) {
      const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(1)
      return {
        isValid: false,
        error: `Le fichier est trop volumineux. Taille maximale: ${maxSizeMB} MB`
      }
    }

    // Vérifier le type
    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Type de fichier non autorisé. Types autorisés: ${options.allowedTypes.join(', ')}`
      }
    }

    // Vérifier que le fichier n'est pas vide
    if (file.size === 0) {
      return {
        isValid: false,
        error: 'Le fichier est vide'
      }
    }

    return { isValid: true }
  },

  // Traitement d'un fichier (compression, redimensionnement)
  async processFile(file: File, options?: UploadOptions): Promise<File> {
    if (!options?.compress && !options?.resize) {
      return file
    }

    // Si c'est une image et qu'on veut la traiter
    if (file.type.startsWith('image/')) {
      return await this.processImage(file, options)
    }

    return file
  },

  // Traitement d'une image
  private async processImage(file: File, options?: UploadOptions): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let { width, height } = img

        // Redimensionnement
        if (options?.resize) {
          if (options.resize.width && options.resize.height) {
            if (options.resize.maintainAspectRatio) {
              const ratio = Math.min(
                options.resize.width / width,
                options.resize.height / height
              )
              width *= ratio
              height *= ratio
            } else {
              width = options.resize.width
              height = options.resize.height
            }
          } else if (options.resize.width) {
            const ratio = options.resize.width / width
            width = options.resize.width
            height *= ratio
          } else if (options.resize.height) {
            const ratio = options.resize.height / height
            height = options.resize.height
            width *= ratio
          }
        }

        canvas.width = width
        canvas.height = height

        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height)

        // Convertir en blob avec qualité
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const processedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              })
              resolve(processedFile)
            } else {
              resolve(file)
            }
          },
          file.type,
          options?.quality || 0.9
        )
      }

      img.src = URL.createObjectURL(file)
    })
  },

  // Formater la taille d'un fichier
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  // Obtenir l'extension d'un fichier
  getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
  },

  // Vérifier si un fichier est une image
  isImage(file: File): boolean {
    return file.type.startsWith('image/')
  },

  // Vérifier si un fichier est un document
  isDocument(file: File): boolean {
    const documentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    return documentTypes.includes(file.type)
  }
}

export default uploadApi
