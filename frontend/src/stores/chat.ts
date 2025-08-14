import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Message, Conversation, Attachment } from '../types'
import { chatApi } from '../services/api.chat'

export const useChatStore = defineStore('chat', () => {
  // State
  const conversations = ref<Conversation[]>([])
  const currentConversation = ref<Conversation | null>(null)
  const messages = ref<Message[]>([])
  const unreadCount = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isTyping = ref(false)
  const typingUsers = ref<string[]>([])

  // Getters
  const hasConversations = computed(() => conversations.value.length > 0)
  const hasMessages = computed(() => messages.value.length > 0)
  const currentConversationId = computed(() => currentConversation.value?.id)
  const totalUnreadCount = computed(() => conversations.value.reduce((total, conv) => total + conv.unreadCount, 0))

  // Actions
  const getConversations = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.getConversations()
      
      if (response.success && response.data) {
        conversations.value = response.data
        unreadCount.value = totalUnreadCount.value
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération des conversations'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération des conversations'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getConversationById = async (id: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.getConversation(id)
      
      if (response.success && response.data) {
        currentConversation.value = response.data
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération de la conversation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération de la conversation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const getMessages = async (conversationId: string, page = 1, limit = 50) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.getMessages(conversationId, page, limit)
      
      if (response.success && response.data) {
        if (page === 1) {
          messages.value = response.data.data
        } else {
          messages.value = [...response.data.data, ...messages.value]
        }
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la récupération des messages'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la récupération des messages'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const sendMessage = async (conversationId: string, content: string, attachments?: File[]) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.sendMessage(conversationId, content, attachments)
      
      if (response.success && response.data) {
        const newMessage = response.data
        
        // Ajouter le message à la liste
        messages.value.push(newMessage)
        
        // Mettre à jour la conversation
        const conversation = conversations.value.find(conv => conv.id === conversationId)
        if (conversation) {
          conversation.lastMessage = newMessage
          conversation.updatedAt = newMessage.createdAt
        }
        
        // Mettre à jour la conversation courante
        if (currentConversation.value?.id === conversationId) {
          currentConversation.value.lastMessage = newMessage
          currentConversation.value.updatedAt = newMessage.createdAt
        }
        
        return { success: true, message: newMessage }
      } else {
        error.value = response.message || 'Erreur lors de l\'envoi du message'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'envoi du message'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const createConversation = async (participantIds: string[]) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.createConversation(participantIds)
      
      if (response.success && response.data) {
        const newConversation = response.data
        conversations.value.unshift(newConversation)
        return { success: true, conversation: newConversation }
      } else {
        error.value = response.message || 'Erreur lors de la création de la conversation'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la création de la conversation'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const markAsRead = async (conversationId: string) => {
    try {
      const response = await chatApi.markAsRead(conversationId)
      
      if (response.success) {
        // Mettre à jour le statut dans les listes
        const conversation = conversations.value.find(conv => conv.id === conversationId)
        if (conversation) {
          conversation.unreadCount = 0
        }
        
        if (currentConversation.value?.id === conversationId) {
          currentConversation.value.unreadCount = 0
        }
        
        // Marquer tous les messages comme lus
        messages.value.forEach(msg => {
          if (msg.conversationId === conversationId) {
            msg.isRead = true
          }
        })
        
        unreadCount.value = totalUnreadCount.value
      }
    } catch (err) {
      console.error('Erreur lors du marquage comme lu:', err)
    }
  }

  const markMessageAsRead = async (messageId: string) => {
    try {
      const response = await chatApi.markMessageAsRead(messageId)
      
      if (response.success) {
        const message = messages.value.find(msg => msg.id === messageId)
        if (message) {
          message.isRead = true
        }
      }
    } catch (err) {
      console.error('Erreur lors du marquage du message comme lu:', err)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.deleteMessage(messageId)
      
      if (response.success) {
        // Supprimer le message de la liste
        messages.value = messages.value.filter(msg => msg.id !== messageId)
        
        // Mettre à jour la conversation si nécessaire
        const deletedMessage = messages.value.find(msg => msg.id === messageId)
        if (deletedMessage && currentConversation.value?.id === deletedMessage.conversationId) {
          const lastMessage = messages.value[messages.value.length - 1]
          if (lastMessage) {
            currentConversation.value.lastMessage = lastMessage
            currentConversation.value.updatedAt = lastMessage.createdAt
          }
        }
        
        return { success: true }
      } else {
        error.value = response.message || 'Erreur lors de la suppression du message'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la suppression du message'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const uploadAttachment = async (file: File) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await chatApi.uploadAttachment(file)
      
      if (response.success && response.data) {
        return { success: true, attachment: response.data }
      } else {
        error.value = response.message || 'Erreur lors de l\'upload'
        return { success: false, error: error.value }
      }
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'upload'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const setTyping = (conversationId: string, isTyping: boolean) => {
    if (isTyping) {
      if (!typingUsers.value.includes(conversationId)) {
        typingUsers.value.push(conversationId)
      }
    } else {
      typingUsers.value = typingUsers.value.filter(id => id !== conversationId)
    }
  }

  const clearCurrentConversation = () => {
    currentConversation.value = null
    messages.value = []
  }

  const clearError = () => {
    error.value = null
  }

  // Polling pour les nouveaux messages (fallback si pas de WebSocket)
  let pollingInterval: NodeJS.Timeout | null = null

  const startPolling = (conversationId: string) => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
    }
    
    pollingInterval = setInterval(async () => {
      if (currentConversation.value?.id === conversationId) {
        await getMessages(conversationId, 1, 50)
      }
    }, 5000) // Poll toutes les 5 secondes
  }

  const stopPolling = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval)
      pollingInterval = null
    }
  }

  return {
    // State
    conversations,
    currentConversation,
    messages,
    unreadCount,
    isLoading,
    error,
    isTyping,
    typingUsers,
    
    // Getters
    hasConversations,
    hasMessages,
    currentConversationId,
    totalUnreadCount,
    
    // Actions
    getConversations,
    getConversationById,
    getMessages,
    sendMessage,
    createConversation,
    markAsRead,
    markMessageAsRead,
    deleteMessage,
    uploadAttachment,
    setTyping,
    clearCurrentConversation,
    clearError,
    startPolling,
    stopPolling
  }
})
