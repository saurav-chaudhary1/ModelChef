import { useState , useRef, useCallback } from 'react';
import { Upload, Save, Zap, Settings, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Select , SelectContent , SelectItem , SelectTrigger , SelectValue } from '@/components/ui/select';
import sparkMd5, { hash } from 'spark-md5';
import { data } from 'react-router-dom';
function FineTune(){
    const [selectedModel , setSelectedModel] = useState(null);
    const availableModels = [
        { id: 'llama3-8b', name: 'Llama 3 (8B)', type: 'base' },
        { id: 'llama3-70b', name: 'Llama 3 (70B)', type: 'base' },
        { id: 'mistral-7b', name: 'Mistral (7B)', type: 'base' },
        { id: 'phi3-14b', name: 'Phi-3 (14B)', type: 'base' },
        { id: 'llama3-instruct-8b', name: 'Llama 3 - Instruct (8B)', type: 'instruct' }
    ];

    const [dataset , setDataset] = useState(null);
    const [uploadState , setUploadState] = useState({
        phase : 'idle',
        progress : 0,
        uploadedChunks : 0,
        totalChunks : 0,
        canStartTraining : false,
        isPaused : false,
        error : null
    });

    const CHUNK_SIZE = 100;
    const PRELOAD_PERCENTAGE = 0.25;

    const calculatePreloadSize = (datasetSize , batchsize = 16)=>{
        const miniPreload = Math.max(batchsize * 10 , dataset * 0.25);
        return Math.min(miniPreload , datasetSize);
    };

    const CreateChunks = (data , preloadSize)=>{
        const chunks = []
        for(let i = 0; i <data.length; i += CHUNK_SIZE){
            const chunkData = data.slice(i , Math.min(i + CHUNK_SIZE , data.length));
            chunks.push({
                id : i/CHUNK_SIZE,
                data : chunkData,
                isPreload : i < preloadSize,
                uploaded : false,
                hash : `chunk_${i}_${chunkData.length}`
            })
        }
        return chunks
    }

    const uploadChunk = async () =>{
        return
    }

    const handleFileUpload = useCallback((event) =>{
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) =>{
            try{
                const data = JSON.parse(e.target.result);
                setDataset(data);
                setUploadState(prev => ({...prev , phase : 'idle' , error : null}));
            }catch (error){
                setUploadState(prev => ({...prev , phase : 'error' , error : 'Failed to parse JSON file'}));
            }
        }
        reader.readAsText(file);
    } , []);

    const VisualisingEverything = ()=>{
        if (!dataset){
            console.log("No dataset loaded yet");
            return;
        }
        const preload_size = calculatePreloadSize(dataset.length);
        const TotalChunks = CreateChunks(dataset , preload_size)
        const preloadChunks = TotalChunks.filter(chunk => chunk.isPreload);

        console.log("Dataset size:", dataset.length);
        console.log("Preload size:", preload_size);
        console.log("Total chunks:", TotalChunks.length);
        console.log("Preload chunks:", preloadChunks.length);
        console.log("Streaming chunks:", TotalChunks.length - preloadChunks.length);
        console.log("Actual preload percentage:", ((preload_size / dataset.length) * 100).toFixed(1) + "%");
        console.log("Total chunks to be uploaded for preload size:" , Math.ceil(preloadChunks/CHUNK_SIZE))
    }

    const handleUploadAndVisualise = (event)=>{
        handleFileUpload(event)

        setTimeout(()=>{
            VisualisingEverything();
        } , 100);
    };

    return(
        <>
            <section>
                <div className='blob w-96 h-96 bg-red-500 top-20 left-20'></div>
                <div className='blob w-96 h-96 bg-purple-500 top-40 left-320'></div>
                <div className='blob w-96 h-96 bg-blue-500 top-120 left-200'></div>
                <div className="w-full pt-5 flex flex-row">
                    <div className="h-[700px] border-gray-800 bg-background/80 backdrop-blur-md w-[370px]">
                        <div className='flex flex-col pl-4 pt-4 gap-5 text-black'>
                            <h1 className="text-white text-[20px] font-semibold">Select Base Model</h1>
                            {availableModels.map(model =>(
                                <div key={model.id} className={`p-1 rounded-lg border ${selectedModel === model.id ? 'border-gray-800 bg-gray-900 backdrop-blur-md' : 'border-gray-800 bg-background/80 backdrop-blur-md hover:bg-gray-900'} cursor-pointer w-[280px]`}
                                    onClick={()=> setSelectedModel(model.id)}
                                    >
                                    <div className='font-medium text-white pl-2 pt-2'>
                                        <h1>{model.name}</h1>
                                    </div>
                                    <div className='text-xs text-white pl-2 pb-2'>
                                        <h1>{model.type}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 border-gray-800 bg-background/80 backdrop-blur-md text-white p-4">
                        <h1 className='text-[20px] font-semibold pb-5'>Fine-Tune {selectedModel}</h1>
                        <div className='h-[200px] p-4 flex flex-row gap-10'>
                            <div>
                                <h1 className='text-[20px] text-white font-semibold pl-[75px] pb-2'>Upload training Dataset</h1>
                                <div className='flex flex-col rounded-lg border border-gray-800 bg-background/80 backdrop-blur-md w-[350px] items-center justify-center h-[200px] gap-2'>
                                    <Upload className='font-semibold mx-auto h-10 w-10 text-white-400'/>
                                    {/* <button className='border border-white-500 bg-white text-black rounded-lg p-1 px-3 cursor-pointer'>Choose File</button> */}
                                    <input type="file"
                                        accept=".json,.jsonl,.csv,.txt"
                                        style={{display : 'none'}}
                                        id = "dataset-input"
                                        onChange={handleUploadAndVisualise}
                                        />
                                    <label htmlFor="dataset-input" className='border border-white-500 bg-white text-black rounded-lg p-1 px-3 cursor-pointer'>
                                        Choose File
                                    </label>
                                    <p>JSON, JSONL, CSV, or Text files supported</p>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-[20px] text-white font-semibold pl-[175px] pb-2'>Set Training Parameters</h1>
                                <div className=' grid grid-cols-2 gap-6 rounded-lg border border-gray-800 bg-background/80 backdrop-blur-md w-[540px] items-center justify-center h-[200px] gap-2 p-3 px-6'>
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                            Learning Rate
                                        </label>
                                        <input type="number" defaultValue="2e-5" className='w-full border border-gray-800 rounded-md px-3 py-2'/>
                                        <p className="mt-1 text-xs text-gray-100">Recommended: 1e-5 to 5e-5</p>
                                    </div>

                                    <div className='mt-[-20px]'>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                            Batch Size
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="4" 
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                            Number of Epochs
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="3" 
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                            Max Sequence Length
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="2048" 
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h1 className='text-[20px] text-white font-semibold pl-[70px] pb-2'>Set QLORA Parameters</h1>
                                <div className='grid grid-row-4 gap-6 rounded-lg border border-gray-800 bg-background/80 backdrop-blur-md w-[350px] items-center justify-center h-[380px] gap-1 p-3'>
                                    <div>
                                        <label className='block text-sm font-medium text-white-700 mb-1'>
                                            LoRA Rank (r)
                                        </label>
                                        <input type="number" defaultValue="16" className='w-full border border-gray-800 rounded-md px-3 py-2'/>
                                        <p className='mt-1  text-xs text-gray-100'>Lower = more efficient, Higher = better quality</p>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-white-700 mb-1'>
                                            LoRA Alpha
                                        </label>
                                        <input type="number" defaultValue="32" className='w-full border border-gray-800 rounded-md px-3 py-2'/>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-white-700 mb-1'>
                                            LoRA Dropout
                                        </label>
                                        <input type="number" defaultValue="0.05" className='w-full border border-gray-800 rounded-md px-3 py-2'/>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-white-700 mb-1'>
                                            Quantization Bits
                                        </label>

                                        <Select defaultValue="8">
                                            <SelectTrigger className='border border-gray-800 bg-background/80 backdrop-blur-mdtext-white-700 focus:ring-gray-500 w-[260px]'>
                                                <SelectValue placeholder="Select the type"/>
                                            </SelectTrigger>
                                            <SelectContent className='border border-gray-800 bg-background/80 backdrop-blur-md text-white-700 focus:ring-gray-500'>
                                                <SelectItem value="4">4-bit (Fastest, lowest quality)</SelectItem>
                                                <SelectItem value="8">8-bit (Balanced)</SelectItem>
                                                <SelectItem value="16">16-bit (Highest quality)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>


                            <div className='absolute top-[340px]'>
                                <h1 className='text-[20px] text-white font-semibold pl-[390px] pb-2'>Set Advance Parameters</h1>
                                <div className='grid grid-cols-3 gap-3 p-3 rounded-lg border border-gray-800 bg-background/80 backdrop-blur-md w-[930px] h-[200px] items-center justify-center'>

                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        Weight Decay
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="0.01" 
                                        step="0.01"
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        Warmup Steps
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="100" 
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        Optimizer
                                        </label>
                                        <Select>
                                            <SelectTrigger className="border border-gray-800 bg-background/80 backdrop-blur-md text-white w-[280px]">
                                                <SelectValue placeholder="Select Optimizer" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-800 bg-background/80 backdrop-blur-md text-white">
                                                <SelectItem value="adamw_torch">AdamW (PyTorch)</SelectItem>
                                                <SelectItem value="adamw_hf">AdamW (Hugging Face)</SelectItem>
                                                <SelectItem value="adafactor">Adafactor</SelectItem>
                                                <SelectItem value="sgd">SGD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        LR Scheduler
                                        </label>
                                        <Select>
                                            <SelectTrigger className="border border-gray-800 bg-background/80 backdrop-blur-md text-white w-[295px]">
                                                <SelectValue placeholder="Select Scheduler Type" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-800 bg-background/80 backdrop-blur-md text-white">
                                                <SelectItem value="linear">Linear</SelectItem>
                                                <SelectItem value="cosine">Cosine</SelectItem>
                                                <SelectItem value="cosine_with_restarts">Cosine with Restarts</SelectItem>
                                                <SelectItem value="polynomial">Polynomial</SelectItem>
                                                <SelectItem value="constant">Constant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        Gradient Accumulation Steps
                                        </label>
                                        <input 
                                        type="number" 
                                        defaultValue="1" 
                                        className="w-full border border-gray-800 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-white-700 mb-1">
                                        Mixed Precision
                                        </label>
                                        <Select defaultValue="bf16">
                                            <SelectTrigger className="bborder border-gray-800 bg-background/80 backdrop-blur-md text-white w-[280px]">
                                                <SelectValue placeholder="Select Precision" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-800 bg-background/80 backdrop-blur-md text-white">
                                                <SelectItem value="no">No</SelectItem>
                                                <SelectItem value="fp16">FP16</SelectItem>
                                                <SelectItem value="bf16">BF16</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            </div>

                            <div className='absolute top-[510px] left-[1000px]'>
                                <div className='blob w-96 h-66 bg-blue-500 right-20 bottom-100'></div>
                                <div className='blob w-96 h-66 bg-blue-500'></div>
                                <button className='border border-gray-800 bg-background/80 backdrop-blur-md text-white rounded-lg p-1 px-3 cursor-pointer w-[300px]'>Start Fine-Tuning</button>
                            </div>

                            <div className='absolute top-[600px] left-[30px]'>
                                <h1 className='text-[20px] text-white font-semibold pb-2'>Training Logs</h1>
                                <div className='grid grid-cols-3 gap-3 p-3 rounded-lg border border-gray-800 bg-background/80 backdrop-blur-md w-[1140px] h-[100px]'>
                                    <h1>Training logs will appear here once training starts...</h1>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default FineTune;