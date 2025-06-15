import getMessageByKey from "../../assets/Messages"

const EmptyCard = ({imgSrc, message, onClickFn}) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {message === getMessageByKey('SCRIBBLE_LIST_EMPTY')?
            <img src={imgSrc} alt={getMessageByKey('NO_SCRIBBLES')}  className="w-60 cursor-pointer" onClick={onClickFn}/>
            : <img src={imgSrc} alt={getMessageByKey('NO_SCRIBBLES')}  className="w-60"/>
            }
            <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
                {message}
            </p>
        </div>
    )
}

export default EmptyCard