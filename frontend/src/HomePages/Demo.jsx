import { User, Bot, Send} from "lucide-react";
import { useLanguage } from "../otherFiles/languageContext";
import translation from "../otherFiles/constants";
import { useState , useEffect , useRef } from "react";
import axios from "axios";

function Demo(){
    const { language , setLanguage } = useLanguage();
    const [inputValue , setInputValue] = useState("");
    const t = translation[language];
    const [messageList , setMessageList] = useState([
        { sender: "bot", message: t.demo.starting_message},
    ])
    const currentSummary = useRef("");
    const currentPromptRef = useRef("");
    const textAreaRef = useRef("");
    useEffect(() =>{
        if(textAreaRef.current){
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    } , [inputValue])

    let socketRef = useRef(null);

    function connectWebSocket(){
        const socket = new WebSocket("ws://127.0.0.1:8002/")
        socketRef.current = socket;

        socket.onopen = (e) =>{
            console.log("Connected to the server");
        }

        socket.onmessage =  async (e) =>{
            const data = JSON.parse(e.data);
            setMessageList(prev => [...prev , { sender: "bot", message: data.response }]);
            console.log(currentPromptRef.current)
            const response = await axios.post("http://localhost:8002/api/summary_demo" , {
                user_message : currentPromptRef.current,
                ai_message : data.response,
                currentSummary : currentSummary.current,
            })
            currentSummary.current = response.data.updated_summary;
            console.log(response.data.updated_summary)
        }

        socket.onclose = (e) =>{
            console.log("Disconnected from the server. Reconnecting....");
            setTimeout(connectWebSocket , 1000)
        }

        socket.onerror = (e) =>{
            console.log('websocket encountered an error' , e.message);
            socket.close();
        }
    }
    useEffect(() => {
        connectWebSocket();
    }, []);

    function sendPrompt(){
        const promptElement = document.getElementById("prompt");
        event.preventDefault();
        setMessageList(prev => [...prev , { sender: "user", message: inputValue}])
        const socket = socketRef.current;
        if (socket && socket.readyState === WebSocket.OPEN){
            socket.send(JSON.stringify({ 'prompt': inputValue , 'language' : language , 'current_summary' : currentSummary.current}));
        }
        else{
            console.log("Socket is not open");
        }
        currentPromptRef.current = inputValue;
        if(inputValue.trim() !== ""){
            setInputValue("");
        }
    }

    const handleKey = (e)=>{
        if (e.key === 'Enter'){
            sendPrompt();
        }
    }

    return(
        <>
            <section className="py-20 bg-background/80 backdrop-blur-lg">
                <div className='blob w-106 h-196 bg-gray-600 top-50 left-10'></div>
                <div className='blob w-96 h-146 bg-purple-500 top-10 left-300'></div>
                <div className='blob w-196 h-46 bg-blue-500 top-20 left-150'></div>
                <div className='blob w-196 h-46 bg-gray-500 top-220 left-150'></div>
                <div className="container mb-4 mx-auto">
                    <div className="mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">{t.demo.title}</h1>
                        <p className="text-xl text-gray-500 mb-20">{t.demo.Description}</p>
                    </div>
                </div>
                <div className="container mb-4 mx-auto">
                        <div className="mx-auto text-center">
                            <div className="bg-background/80 backdrop-blur-lg border border-gray-900 pt-4 pb-4 w-[800px] mx-auto rounded-3xl h-170">
                                <h3>{t.demo.chat_with_assistant}</h3>
                                <hr className="my-4 border-t border-gray-600"/>
                                <div className="h-120 overflow-y-auto px-4">
                                        {messageList.map((msg , index)=> (
                                            <div
                                            key={index}
                                            className={`flex items-start mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                            {msg.sender === "bot" && (
                                                <>
                                                    <div className="ml-3 mt-0.5 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                                        <Bot className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div className="message-bot w-[450px] text-start" id="llm-response">
                                                        <p className="text-white ml-3 bg-background/80 backdrop-blur-lg border border-gray-900 px-3 py-3 rounded-2xl">{msg.message}</p>
                                                    </div>
                                                </>
                                            )}
                                            {msg.sender === "user" && (
                                                <>
                                                    <div className="user flex mt-10 mb-10 ml-71 overflow">
                                                        <div className="message-user w-[450px] text-start">
                                                            <p className="text-white ml-3 bg-background/80 backdrop-blur-lg border border-gray-900 px-3 py-3 rounded-xl">{msg.message}</p>
                                                        </div>
                                                        <div className="ml-3  w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                            <User className="h-6 w-6 text-white" />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            </div>
                                        ))}
                                </div>
                                <hr className="my-4 border-t border-gray-600"/>
                                <div className="flex items-center mt-4 px-4">
                                    {/* <input
                                        type="text"
                                        placeholder="Type your message..."
                                        id="prompt"
                                        onKeyPress={handleKey}
                                        className="flex-grow px-4 py-3 rounded-xl bg-background/80 backdrop-blur-lg border border-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    /> */}
                                    <textarea
                                    rows={1}
                                    ref={textAreaRef}
                                    value={inputValue}
                                    placeholder="Please Enter your input"
                                    onKeyDown={handleKey}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full resize-none bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm max-h-[200px] overflow-y-auto max-h-[200px]"
                                    />
                                    <button className="ml-3 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:bg-green-800 transition hover:cursor-pointer hover:from-blue-600 hover:to-purple-700">
                                        <Send className="h-5 w-5" onClick={sendPrompt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}

export default Demo;