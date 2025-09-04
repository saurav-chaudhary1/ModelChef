import { useState , useRef } from "react";
import { Search } from "lucide-react";
function ModelsPage(){
    const inputRef = useRef(null);
    const [query , setQuery] = useState("");
    const [Category , setCategory] = useState("");

    const focusInput = () =>{
        if(inputRef.current){
            inputRef.current.focus();
        }
    }

    const MultiModel = [
        { id: "audio_text_to_text", name: "Audio-Text-to-Text", category: "Multimodal" },
        { id: "image_text_to_text", name: "Image-Text-to-Text", category: "Multimodal" },
        { id: "visual_qa", name: "Visual Question Answering", category: "Multimodal" },
        { id: "doc_qa", name: "Document Question Answering", category: "Multimodal" },
        { id: "video_text_to_text", name: "Video-Text-to-Text", category: "Multimodal" },
        { id: "visual_doc_retrieval", name: "Visual Document Retrieval", category: "Multimodal" },
        { id: "any_to_any", name: "Any-to-Any", category: "Multimodal" },
    ]

    const ComputerVision = [
        { id: "depth_estimation", name: "Depth Estimation", category: "Computer Vision" },
        { id: "image_classification", name: "Image Classification", category: "Computer Vision" },
        { id: "object_detection", name: "Object Detection", category: "Computer Vision" },
        { id: "image_segmentation", name: "Image Segmentation", category: "Computer Vision" },
        { id: "text_to_image", name: "Text-to-Image", category: "Computer Vision" },
        { id: "image_to_text", name: "Image-to-Text", category: "Computer Vision" },
        { id: "image_to_image", name: "Image-to-Image", category: "Computer Vision" },
        { id: "image_to_video", name: "Image-to-Video", category: "Computer Vision" },
        { id: "unconditional_image_gen", name: "Unconditional Image Generation", category: "Computer Vision" },
        { id: "video_classification", name: "Video Classification", category: "Computer Vision" },
        { id: "text_to_video", name: "Text-to-Video", category: "Computer Vision" },
        { id: "zero_shot_image_class", name: "Zero-Shot Image Classification", category: "Computer Vision" },
        { id: "mask_generation", name: "Mask Generation", category: "Computer Vision" },
        { id: "zero_shot_obj_detection", name: "Zero-Shot Object Detection", category: "Computer Vision" },
        { id: "text_to_3d", name: "Text-to-3D", category: "Computer Vision" },
        { id: "image_to_3d", name: "Image-to-3D", category: "Computer Vision" },
        { id: "image_feature_extraction", name: "Image Feature Extraction", category: "Computer Vision" },
        { id: "keypoint_detection", name: "Keypoint Detection", category: "Computer Vision" },
    ]

    const NLP = [
        { id: "text_classification", name: "Text Classification", category: "Natural Language Processing" },
        { id: "token_classification", name: "Token Classification", category: "Natural Language Processing" },
        { id: "table_qa", name: "Table Question Answering", category: "Natural Language Processing" },
        { id: "qa", name: "Question Answering", category: "Natural Language Processing" },
        { id: "zero_shot_classification", name: "Zero-Shot Classification", category: "Natural Language Processing" },
        { id: "translation", name: "Translation", category: "Natural Language Processing" },
        { id: "summarization", name: "Summarization", category: "Natural Language Processing" },
        { id: "feature_extraction", name: "Feature Extraction", category: "Natural Language Processing" },
        { id: "text_generation", name: "Text Generation", category: "Natural Language Processing" },
        { id: "text2text_generation", name: "Text2Text Generation", category: "Natural Language Processing" },
        { id: "fill_mask", name: "Fill-Mask", category: "Natural Language Processing" },
        { id: "sentence_similarity", name: "Sentence Similarity", category: "Natural Language Processing" },
        { id: "text_ranking", name: "Text Ranking", category: "Natural Language Processing" },
    ]

    const Audio = [
        { id: "text_to_speech", name: "Text-to-Speech", category: "Audio" },
        { id: "text_to_audio", name: "Text-to-Audio", category: "Audio" },
        { id: "asr", name: "Automatic Speech Recognition", category: "Audio" },
        { id: "audio_to_audio", name: "Audio-to-Audio", category: "Audio" },
        { id: "audio_classification", name: "Audio Classification", category: "Audio" },
        { id: "vad", name: "Voice Activity Detection", category: "Audio" }
    ]

    return(
        <>
            <section className="relative">
                <div className='blob w-196 h-96 bg-gray-500 top-20 left-20'></div>
                <div className='blob w-96 h-106 bg-gray-500 top-40 left-320'></div>
                <div className='blob w-246 h-46 bg-gray-500 top-120 left-100'></div>
                <div className="bg-background/80 backdrop-blur-md">
                    <div className="bg-background/80 backdrop-blur-md border border-gray-900 rounded-lg w-[470px] absolute top-[80px] left-[190px] h-[700px] overflow-y-auto">
                        <div className="relative w-[400px] ml-[20px] mt-[20px]">
                            <input
                                type="text"
                                ref={inputRef}
                                placeholder="Search for type"
                                className="bg-background/80 backdrop-blur-md border border-gray-900 rounded-2xl p-1 pl-[20px] pr-8 w-full"
                                onChange={(e) => {setQuery(e.target.value)}}
                            />
                            <Search
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                                size={18}
                                onClick={() => focusInput()}
                            />
                        </div>

                        <div className="absolute left-[30px] bg-background/80 backdrop-blur-md">
                            <div className="space-y-6 mt-10">
                                <div className="bg-background/80 backdrop-blur-md  rounded-lg w-[420px]  p-1 pb-[30px] ">
                                    <h1 className="text-lg font-semibold mb-2">Multimodel</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {MultiModel.map(model => (
                                        <div key={model.id} 
                                            className={`${query.trim() !== "" && model.name.toLowerCase().includes(query.toLowerCase().trim()) ? 
                                            "bg-blue-500 animate-pulse" : "bg-background/80 backdrop-blur-md"} text-white rounded-2xl border border-gray-900 px-2 
                                            py-1 text-sm text-center hover:cursor-pointer hover:bg-gray-900 whitespace-nowrap ${Category === model.name ? "bg-gray-900" : "bg-background/80 backdrop-blur-md" }`}
                                            onClick={() => setCategory(model.name)}
                                        >
                                            {model.name}
                                        </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-background/80 backdrop-blur-md  rounded-lg w-[420px]  p-1 pb-[30px]">
                                    <h1 className="text-lg font-semibold mb-2">Computer Vision</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {ComputerVision.map(model => (
                                        <div key={model.id} 
                                            className={`${query.trim() !== "" && model.name.toLowerCase().includes(query.toLowerCase().trim()) ? 
                                            "bg-blue-500 animate-pulse" : "bg-background/80 backdrop-blur-md"} text-white rounded-2xl border border-gray-900 px-2
                                            py-1 text-sm text-center hover:cursor-pointer hover:bg-gray-900 whitespace-nowrap ${Category === model.name ? "bg-gray-900" : "bg-background/80 backdrop-blur-md" }`}
                                            onClick={() => setCategory(model.name)}
                                        >
                                            {model.name}
                                        </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-background/80 backdrop-blur-md  rounded-lg w-[420px]  p-1 pb-[30px]">
                                    <h1 className="text-lg font-semibold mb-2">Natural Language Processing</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {NLP.map(model => (
                                        <div key={model.id} 
                                            className={`${query.trim() !== "" && model.name.toLowerCase().includes(query.toLowerCase().trim()) ? 
                                            "bg-blue-500 animate-pulse" : "bg-background/80 backdrop-blur-md"} text-white rounded-2xl border border-gray-900 px-2
                                            py-1 text-sm text-center hover:cursor-pointer hover:bg-gray-900 whitespace-nowrap ${Category === model.name ? "bg-gray-900" : "bg-background/80 backdrop-blur-md" }`}
                                            onClick={() => setCategory(model.name)}
                                        >
                                            {model.name}
                                        </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-background/80 backdrop-blur-md  rounded-lg w-[420px]  p-1 pb-[30px]">
                                    <h1 className="text-lg font-semibold mb-2"> Audio</h1>
                                    <div className="flex flex-wrap gap-2">
                                        {Audio.map(model => (
                                        <div key={model.id}
                                            className={`${query.trim() !== "" && model.name.toLowerCase().includes(query.toLowerCase().trim()) ?
                                            "bg-blue-500 animate-pulse" : "bg-background/80 backdrop-blur-md"} text-white rounded-2xl border border-gray-900 px-2
                                            py-1 text-sm text-center hover:cursor-pointer hover:bg-gray-900 whitespace-nowrap ${Category === model.name ? "bg-gray-900" : "bg-background/80 backdrop-blur-md" }`}
                                            onClick={() => setCategory(model.name)}
                                        >
                                            {model.name}
                                        </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="bg-background/80 backdrop-blur-md  rounded-lg w-[420px]  p-1 pb-[30px]">
                                    <h1> Others</h1>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div className="bg-background/80 background border border-gray-900 h-[700px] w-[950px] rounded-lg absolute top-[80px] left-[700px]">
                        <div className="relative w-[400px] ml-[20px] mt-[20px]">
                            <input
                                type="text"
                                ref={inputRef}
                                placeholder="Search for model"
                                className="bg-background/80 backdrop-blur-md border border-gray-900 rounded-2xl p-1 pl-[20px] pr-8 w-full"
                            />
                            <Search
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                                size={18}
                                onClick={() => focusInput()}
                            />
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default ModelsPage;