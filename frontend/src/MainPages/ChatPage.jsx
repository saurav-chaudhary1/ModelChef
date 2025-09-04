import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User , Bot , Send } from "lucide-react";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import {useEffect , useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import '../otherFiles/markcss.css'
import axios from "axios";

function ChatPage() {
    const [inputValue, setInputValue] = useState("");
    const currentSummary = useRef("");
    const currentPromptRef = useRef("");
    const textareaRef = useRef(null);
    const socketRef = useRef(null);
    const [model , setModel] = useState("gemma2-9b-it");
    const [messageList , setMessageList] = useState([
        { sender: "bot", message: "Hello i am an AI assistant. How can I help you today?"},
    ])
    useEffect(() =>{
        if(textareaRef.current){
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    } , [inputValue]);
    const [temperature, setTemperature] = useState([0.7]);
    const [topP , setTopP] = useState([0.5]);
    const [maxTokens , setMaxTokens] = useState(1024);

    function connectWebsocket(){
        const socket = new WebSocket("ws://127.0.0.1:8002/chat")
        socketRef.current = socket;

        socket.onopen = ()=>{
            console.log("WebSocket connected");
        }

        socket.onmessage = async (e) =>{
            const data = JSON.parse(e.data);
            setMessageList(prev => [...prev , { sender: "bot", message: data.response}])
            console.log(currentPromptRef.current)
            const response = await axios.post("http://localhost:8002/api/summary" , {
                user_message : currentPromptRef.current,
                ai_message : data.response,
                current_summary : currentSummary.current
            })
            currentSummary.current = response.data.updated_summary;
            console.log(response.data.updated_summary)
        }

        socket.onclose = (e) =>{
            console.log("WebSocket closed. Reconnecting....");
            setTimeout(connectWebsocket , 1000);
        }
        socket.onerror = (e) =>{
            console.error("WebSocket error observed:", e.message);
            socket.close();
        }
    }

    useEffect(()=>{
        connectWebsocket();
    } , []);

    const handleKey = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            setMessageList((prev) => [...prev, { sender: "user", message: inputValue }]);
            const socket = socketRef.current;
            if(socket && socket.readyState == WebSocket.OPEN){
                console.log("sending data")
                socket.send(JSON.stringify({
                    'prompt': inputValue,
                    'model' : model,
                    'temperature': temperature[0],
                    'topP': topP[0],
                    'maxTokens': maxTokens,
                    'current_summary' : currentSummary.current
                }))
                currentPromptRef.current = inputValue;
                if(inputValue.trim() !== ""){
                    setInputValue("");
                }
            }
            else{
                console.error("WebSocket is not open. Message not sent.");
            }
        }
    }

    return (
        <section className="py-2">
                <div className='blob w-96 h-96 bg-violet-500 top-20 left-20'></div>
                <div className='blob w-96 h-96 bg-green-500 top-40 left-320'></div>
                <div className='blob w-96 h-96 bg-orange-500 top-120 left-200'></div>
            <div className="w-full flex justify-end  pr-10 pt-20 gap-10">

            <div className="chat-container w-[950px] h-[760px] mt-[-60px] rounded-3xl shadow-lg border border-gray-800 bg-background/80 backdrop-blur-md flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {messageList.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-end gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.sender === "bot" && (
                        <>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                            <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div className="border border-gray-800 bg-background/80 backdrop-blur-md text-gray-100 px-4 py-3 rounded-2xl max-w-[820px] shadow-sm  break-words whitespace-pre-wrap">
                                    <div className="response-content">
                                    <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    // rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                    >
                                    {msg.message}
                                    </ReactMarkdown>
                                    </div>
                            </div>
                        </>
                        )}

                        {msg.sender === "user" && (
                        <>
                            <div className="border border-gray-800 bg-background/80 backdrop-blur-md text-white px-4 py-3 rounded-2xl max-w-[480px] shadow-sm">
                            {msg.message}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                            </div>
                        </>
                        )}
                    </div>
                    ))}
                </div>

                <div className="border-t border-gray-800" />

                <div className="bg-black rounded-2xl px-4 pt-3 pb-2 border border-gray-800 shadow-inner focus-within:ring-1 focus-within:ring-gray-600 transition-all">
                    <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputValue}
                    placeholder="Type your message..."
                    onKeyDown={handleKey}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full resize-none bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm max-h-[200px] overflow-y-auto max-h-[200px]"
                    />
                    <div className="flex justify-between items-center mt-2">
                    <button className="text-gray-500 hover:text-purple-500 transition-colors">
                        <Paperclip className="h-5 w-5 hover:cursor-pointer" />
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl transition hover:cursor-pointer hover:from-blue-600 hover:to-purple-700"
                    >
                        <Send className="h-5 w-5" onClick={handleKey} />
                    </button>
                    </div>
                </div>
                </div>



                <div className="border border-gray-800 bg-background/80 backdrop-blur-md w-[490px] h-[400px] p-6 rounded-2xl shadow-lg flex flex-col gap-6 text-left text-white">
                    <div className="flex flex-col gap-2">
                        <Label className="text-muted-foreground">Choose Model:</Label>
                        <Select defaultValue="gemma2-9b-it"
                            onValueChange = {(selectedModel) =>{
                                setModel(selectedModel);
                            }}>
                            <SelectTrigger className="border border-gray-800 bg-background/80 backdrop-blur-md text-white-400 text-sm w-full">
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent className="border border-gray-800 bg-background/80 backdrop-blur-sm text-white-400">
                                <SelectItem value="gemma2-9b-it">gemma2-9b-it</SelectItem>
                                <SelectItem value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</SelectItem>
                                <SelectItem value="llama3-70b-8192">llama3-70b-8192</SelectItem>
                                <SelectItem value="llama3-8b-8192">llama3-8b-8192</SelectItem>
                                <SelectItem value="deepseek-r1-distill-llama-70b">deepseek-r1-distill-llama-70b</SelectItem>
                                <SelectItem value="mistral-saba-24b">mistral-saba-24b</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium text-muted-foreground">Temperature</Label>
                            <span className="text-sm text-slate-400">{temperature[0].toFixed(2)}</span>
                        </div>
                        <Slider
                            defaultValue={[0.7]}
                            min={0}
                            max={1}
                            step={0.01}
                            value={temperature}
                            onValueChange={setTemperature}
                            className="text-white-500 bg-slate-600 font-semibold cursor-pointer"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between items-center">
                            <Label className="text-sm font-medium text-muted-foreground">Top-P Sampling:</Label>
                            <span className="text-sm text-slate-400">{topP[0].toFixed(2)}</span>
                        </div>
                        <Slider
                            defaultValue={[0.5]}
                            min={0}
                            max={1}
                            step={0.01}
                            value={topP}
                            onValueChange={setTopP}
                            className="text-white-500 bg-slate-600  font-semibold cursor-pointer"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-muted-foreground">Max Completion Tokens:</Label>
                        <Input
                            type="number"
                            defaultValue={1024}
                            min={1}
                            max={8192}
                            className="border border-gray-800 bg-background/80 backdrop-blur-sm text-white-400 text-white-400"
                            onChange = {(e) => setMaxTokens(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChatPage;
