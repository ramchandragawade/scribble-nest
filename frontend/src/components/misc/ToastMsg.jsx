import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline, MdErrorOutline } from "react-icons/md";
const ToastMsg = ({ isShown, message, type, onClose }) => {
    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
            onClose()
        },2500);
        return ()=>{
            clearTimeout(timeoutId);
        }
    },[onClose]);
    return (
		<div
			className={`fixed top-20 right-6 transition-all duration-300 ${
				isShown ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div
				className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full 
                    ${
						type === 'delete' || type === 'error'
							? 'after:bg-red-500'
							: 'after:bg-green-500'
					} 
                    after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
			>
				<div className="flex items-center gap-3 py-2 px-4">
					<div
						className={`w-10 h-10 flex items-center justify-center rounded-full
                            ${type === 'delete' || type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}
					>
						{type === 'delete' ? (
							<MdDeleteOutline className="text-xl text-red-500" />
						) : type === 'error' ? (
							<MdErrorOutline className="text-xl text-red-500" />
						) : (
							<LuCheck className="text-xl text-green-500" />
						)}
					</div>
					<p className="text-sm text-slate-800">{message}</p>
				</div>
			</div>
		</div>
	);
}

export default ToastMsg;