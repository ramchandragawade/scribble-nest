import { getInitials } from "../../utils/helper"

const ProfileInfo = ({ userInfo, onLogout }) => {
    const name = userInfo?.fullName;
    return (
        <div className={`flex items-center gap-3`}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-200`}>
                {getInitials(name)}
            </div>
            <div>
                <p className="text-sm font-medium">{name}</p>
                <button className="text-sm text-slate-700 underline hover:text-red-500" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfo