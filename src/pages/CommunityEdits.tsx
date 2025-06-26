import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";
import {useNavigate} from "react-router";


export default function CommunityEdits() {
    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate('/CommunityList/CommunityDetail');
    };

    return (
       <CommunityPostAndEditForm type={"edit"} onSubmit={handleUpdate} />
    );
}