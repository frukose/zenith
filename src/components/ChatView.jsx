import React, { useState, useRef, useEffect } from 'react';
import { User, MessageCircle, Send, Image, Mic, Smile, MoreVertical, Phone, Video, Info } from 'lucide-react';

const initialChats = [
    { id: 1, name: 'Team Zenith', message: 'New filters available! 🔥', time: '2m', status: 'new', avatar: '👻' },
    { id: 2, name: 'Bestie', message: 'Opened', time: '5m', status: 'opened', avatar: '😎' },
    { id: 3, name: 'John Doe', message: 'Received', time: '1h', status: 'received', avatar: '🎮' },
    { id: 4, name: 'Alice', message: 'Tap to view', time: '2h', status: 'new_zenith', avatar: '🌸' },
    { id: 5, name: 'Mike', message: 'Typing...', time: '3h', status: 'typing', avatar: '⚡' },
    { id: 6, name: 'Sarah', message: 'Streaks 🔥', time: '5h', status: 'streak', avatar: '🎨' },
];

export default function ChatView() {
    const [chats, setChats] = useState(initialChats);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() && selectedChat) {
            const newMessage = {
                id: Date.now(),
                text: inputMessage,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');

            // Simulate response
            setTimeout(() => {
                const response = {
                    id: Date.now() + 1,
                    text: ['Hey!', 'What\'s up?', 'Cool!', 'Nice zenith!', 'Let\'s hang out!'][Math.floor(Math.random() * 5)],
                    sender: 'them',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    read: false
                };
                setMessages(prev => [...prev, response]);
            }, 1000 + Math.random() * 2000);
        }
    };

    if (selectedChat) {
        return (
            <div style={{ height: '100%', background: '#000', display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <div style={{
                    padding: '50px 16px 16px',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                            onClick={() => setSelectedChat(null)}
                            style={{ fontSize: 24, cursor: 'pointer' }}
                        >←</div>
                        <div style={{ fontSize: 32 }}>{selectedChat.avatar}</div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 16 }}>{selectedChat.name}</h3>
                            <p style={{ margin: 0, fontSize: 12, color: '#888' }}>Tap to view profile</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <Phone size={20} color="#3CB2E2" />
                        <Video size={20} color="#3CB2E2" />
                        <Info size={20} color="#888" />
                    </div>
                </div>

                {/* Messages */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                }}>
                    {messages.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#666', marginTop: 40 }}>
                            <p>👋 Say hi to {selectedChat.name}!</p>
                            <p style={{ fontSize: 12 }}>Messages disappear after viewing</p>
                        </div>
                    )}
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%'
                            }}
                        >
                            <div style={{
                                background: msg.sender === 'me' ? '#3CB2E2' : '#2a2a2a',
                                padding: '10px 14px',
                                borderRadius: 18,
                                color: 'white'
                            }}>
                                {msg.text}
                            </div>
                            <div style={{ fontSize: 10, color: '#666', marginTop: 4, textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                                {msg.time}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div style={{
                    padding: '12px 16px 100px',
                    borderTop: '1px solid #333',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center'
                }}>
                    <Image size={24} color="#3CB2E2" style={{ cursor: 'pointer' }} />
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Send a chat"
                        style={{
                            flex: 1,
                            background: '#1c1c1c',
                            border: 'none',
                            borderRadius: 20,
                            padding: '10px 16px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                    <Smile size={24} color="#888" style={{ cursor: 'pointer' }} />
                    <div
                        onClick={sendMessage}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: inputMessage.trim() ? '#3CB2E2' : '#333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: inputMessage.trim() ? 'pointer' : 'default',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Send size={18} color="white" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 0 100px', background: '#000', height: '100%', overflowY: 'auto' }}>
            <div style={{ padding: '0 16px 10px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: 24 }}>Chat</h1>
                <MessageCircle size={24} color="#3CB2E2" />
            </div>
            {chats.map(chat => (
                <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderBottom: '1px solid #111',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                        fontSize: 24,
                        border: chat.status === 'new' || chat.status === 'new_snap' ? '2px solid #E91429' : 'none'
                    }}>
                        {chat.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{chat.name}</h3>
                        <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
                            <span style={{
                                color: chat.status === 'new' || chat.status === 'typing' ? '#3CB2E2' : '#888',
                                fontWeight: chat.status === 'new' ? 'bold' : 'normal'
                            }}>
                                {chat.status === 'new' && '■ '}
                                {chat.status === 'new_zenith' && '📸 '}
                                {chat.status === 'streak' && '🔥 '}
                                {chat.message}
                            </span>
                            {' • '}{chat.time}
                        </p>
                    </div>
                    <MessageCircle size={20} color="#333" />
                </div>
            ))}
        </div>
    )
}
