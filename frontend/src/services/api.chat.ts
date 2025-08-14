import { httpClient } from './http'
import type { 
  ApiResponse, 
  Message, 
  Conversation, 
  Attachment, 
  PaginatedResponse
} from '@/types'

export interface ConversationResponse extends PaginatedResponse<Conversation> {}

export interface MessageResponse extends PaginatedResponse<Message> {}

export interface ConversationDetailResponse {
  conversation: Conversation
}

export interface MessageDetailResponse {
  message: Message
}

export const chatApi = {
  // Récupérer les conversations
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return httpClient.get<Conversation[]>('/chat/conversations')
  },

  // Récupérer une conversation par ID
  async getConversation(id: string): Promise<ApiResponse<Conversation>> {
    return httpClient.get<Conversation>(`/chat/conversations/${id}`)
  },

  // Créer une nouvelle conversation
  async createConversation(participantIds: string[]): Promise<ApiResponse<Conversation>> {
    return httpClient.post<Conversation>('/chat/conversations', { participantIds })
  },

  // Récupérer les messages d'une conversation
  async getMessages(
    conversationId: string, 
    page: number = 1, 
    limit: number = 50
  ): Promise<ApiResponse<MessageResponse>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    return httpClient.get<MessageResponse>(`/chat/conversations/${conversationId}/messages?${params.toString()}`)
  },

  // Envoyer un message
  async sendMessage(
    conversationId: string, 
    content: string, 
    attachments?: File[]
  ): Promise<ApiResponse<Message>> {
    const formData = new FormData()
    formData.append('content', content)
    
    if (attachments && attachments.length > 0) {
      attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file)
      })
    }

    return httpClient.post<Message>(`/chat/conversations/${conversationId}/messages`, formData)
  },

  // Marquer une conversation comme lue
  async markAsRead(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/read`)
  },

  // Marquer un message comme lu
  async markMessageAsRead(messageId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/messages/${messageId}/read`)
  },

  // Supprimer un message
  async deleteMessage(messageId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/chat/messages/${messageId}`)
  },

  // Modifier un message
  async editMessage(
    messageId: string, 
    content: string
  ): Promise<ApiResponse<MessageDetailResponse>> {
    return httpClient.patch<MessageDetailResponse>(`/chat/messages/${messageId}`, { content })
  },

  // Répondre à un message
  async replyToMessage(
    messageId: string, 
    content: string
  ): Promise<ApiResponse<Message>> {
    return httpClient.post<Message>(`/chat/messages/${messageId}/reply`, { content })
  },

  // Transférer un message
  async forwardMessage(
    messageId: string, 
    conversationIds: string[]
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/messages/${messageId}/forward`, { conversationIds })
  },

  // Rechercher dans les messages
  async searchMessages(
    query: string, 
    conversationId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<MessageResponse>> {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString()
    })

    if (conversationId) {
      params.append('conversationId', conversationId)
    }

    return httpClient.get<MessageResponse>(`/chat/messages/search?${params.toString()}`)
  },

  // Récupérer les messages non lus
  async getUnreadMessages(): Promise<ApiResponse<Message[]>> {
    return httpClient.get<Message[]>('/chat/messages/unread')
  },

  // Récupérer le nombre de messages non lus
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return httpClient.get<{ count: number }>('/chat/messages/unread-count')
  },

  // Récupérer les messages par date
  async getMessagesByDate(
    date: string, 
    conversationId?: string
  ): Promise<ApiResponse<Message[]>> {
    const params = new URLSearchParams({ date })
    
    if (conversationId) {
      params.append('conversationId', conversationId)
    }

    return httpClient.get<Message[]>(`/chat/messages/by-date?${params.toString()}`)
  },

  // Récupérer les messages par type
  async getMessagesByType(
    type: 'text' | 'image' | 'file',
    conversationId?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<MessageResponse>> {
    const params = new URLSearchParams({
      type,
      page: page.toString(),
      limit: limit.toString()
    })

    if (conversationId) {
      params.append('conversationId', conversationId)
    }

    return httpClient.get<MessageResponse>(`/chat/messages/by-type?${params.toString()}`)
  },

  // Télécharger une pièce jointe
  async downloadAttachment(attachmentId: string): Promise<ApiResponse<{ downloadUrl: string }>> {
    return httpClient.get<{ downloadUrl: string }>(`/chat/attachments/${attachmentId}/download`)
  },

  // Supprimer une pièce jointe
  async deleteAttachment(attachmentId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/chat/attachments/${attachmentId}`)
  },

  // Récupérer les informations d'une pièce jointe
  async getAttachmentInfo(attachmentId: string): Promise<ApiResponse<Attachment>> {
    return httpClient.get<Attachment>(`/chat/attachments/${attachmentId}`)
  },

  // Archiver une conversation
  async archiveConversation(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/archive`)
  },

  // Désarchiver une conversation
  async unarchiveConversation(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/unarchive`)
  },

  // Récupérer les conversations archivées
  async getArchivedConversations(): Promise<ApiResponse<Conversation[]>> {
    return httpClient.get<Conversation[]>('/chat/conversations/archived')
  },

  // Supprimer une conversation
  async deleteConversation(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/chat/conversations/${conversationId}`)
  },

  // Quitter une conversation de groupe
  async leaveGroupConversation(conversationId: string): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/leave`)
  },

  // Ajouter des participants à une conversation de groupe
  async addParticipants(
    conversationId: string, 
    participantIds: string[]
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/participants`, { participantIds })
  },

  // Supprimer des participants d'une conversation de groupe
  async removeParticipants(
    conversationId: string, 
    participantIds: string[]
  ): Promise<ApiResponse<{ message: string }>> {
    return httpClient.delete<{ message: string }>(`/chat/conversations/${conversationId}/participants`, {
      data: { participantIds }
    })
  },

  // Mettre à jour le nom d'une conversation de groupe
  async updateGroupName(
    conversationId: string, 
    name: string
  ): Promise<ApiResponse<ConversationDetailResponse>> {
    return httpClient.patch<ConversationDetailResponse>(`/chat/conversations/${conversationId}/name`, { name })
  },

  // Mettre à jour l'avatar d'une conversation de groupe
  async updateGroupAvatar(
    conversationId: string, 
    avatar: File
  ): Promise<ApiResponse<ConversationDetailResponse>> {
    const formData = new FormData()
    formData.append('avatar', avatar)

    return httpClient.upload<ConversationDetailResponse>(`/chat/conversations/${conversationId}/avatar`, avatar)
  },

  // Récupérer les statistiques de chat
  async getChatStats(): Promise<ApiResponse<{
    totalConversations: number
    totalMessages: number
    unreadMessages: number
    archivedConversations: number
    thisMonth: {
      conversations: number
      messages: number
    }
  }>> {
    return httpClient.get<{
      totalConversations: number
      totalMessages: number
      unreadMessages: number
      archivedConversations: number
      thisMonth: {
        conversations: number
        messages: number
      }
    }>('/chat/stats')
  },

  // Marquer tous les messages comme lus
  async markAllAsRead(): Promise<ApiResponse<{ message: string }>> {
    return httpClient.post<{ message: string }>('/chat/messages/mark-all-read')
  },

  // Nettoyer l'historique des messages
  async clearHistory(
    conversationId: string, 
    beforeDate?: string
  ): Promise<ApiResponse<{ message: string }>> {
    const data: any = {}
    if (beforeDate) {
      data.beforeDate = beforeDate
    }

    return httpClient.post<{ message: string }>(`/chat/conversations/${conversationId}/clear-history`, data)
  }
}

export default chatApi
