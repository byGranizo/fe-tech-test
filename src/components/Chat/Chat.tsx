import { useState } from 'react'
import { useChat } from '@/hooks/useChat'
import { useAuth } from '@/hooks/useAuth'

import userPic from '@/assets/UserPic.png'

import chatIcon from '@/assets/Icons/chat.png'
import chatIconOpen from '@/assets/Icons/chat-on.png'
import closeIcon from '@/assets/Icons/close.png'
import sendIcon from '@/assets/Icons/send.png'

import './Chat.css'

export function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messageToSend, setMessageToSend] = useState('')

  const { chat, fetchChat } = useChat()
  const { user } = useAuth()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  async function handleMessageSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await fetchChat(messageToSend)
    setMessageToSend('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageToSend(event.target.value)
  }

  return (
    <>
      <div className={`modal-background${isOpen ? '' : ' modal-background--closed'}`} />
      <section className={`chat${isOpen ? '' : ' chat--closed'}`}>
        <div className='chat-header'>
          <h3 className='chat-header__title'>Lets talk!</h3>
          <button className='chat-header__close-button no-style' onClick={toggleChat}>
            <img src={closeIcon} />
          </button>
        </div>
        <div className='chat-content'>
          {chat.map((message, index) => (
            <article
              key={index}
              className={`chat-message chat-message--${message.user === user?.username ? 'right' : 'left'}`}
            >
              <img src={userPic} className='chat-message__avatar' />
              <p className='chat-message__text'>{message.text}</p>
            </article>
          ))}
        </div>
        <div className='chat-footer'>
          <form className='chat-footer__input' onSubmit={handleMessageSend}>
            <input
              type='text'
              placeholder='Type a message'
              value={messageToSend}
              onChange={handleInputChange}
            />
            <button type='submit'>
              <img src={sendIcon} />
            </button>
          </form>
          <button className='chat-footer__close-button' onClick={toggleChat}>
            <img src={isOpen ? chatIconOpen : chatIcon} />
          </button>
        </div>
      </section>
    </>
  )
}
