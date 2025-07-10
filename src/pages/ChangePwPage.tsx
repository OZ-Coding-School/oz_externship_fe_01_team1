import ChangePwForm from '@components/mypage/ChangePwForm';
import SidebarMenu from '@components/mypage/SidebarMenu';

export default function ChangePwPage() {
    return (
      <div className="min-h-screen bg-white flex justify-center py-20">
        <div className="flex w-[944px] gap-12">
          <SidebarMenu active="비밀번호 변경" />
          <div className="flex-1">
            <h1 className="text-[32px] font-semibold mb-[20px]">비밀번호 변경</h1>
            <div className="border border-[#E0E0E0] rounded px-[40px] py-[48px] w-[744px]">
              <ChangePwForm />
            </div>
          </div>
        </div>
      </div>
    );
  }