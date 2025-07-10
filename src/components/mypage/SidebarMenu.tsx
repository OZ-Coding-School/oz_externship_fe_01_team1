import { useNavigate } from "react-router";

interface SidebarMenuProps {
    active: '내 정보' | '비밀번호 변경' | '쪽지 시험';
  }
  
  const SidebarMenu = ({ active }: SidebarMenuProps) => {
    const navigate = useNavigate();
  
    const menus: { label: string; path: string }[] = [
      { label: '쪽지 시험', path: '/MyPage/Quiz' }, // 👉 나중에 연결될 임시 경로
      { label: '내 정보', path: '/MyPage' },
      { label: '비밀번호 변경', path: '/MyPage/Password' },
    ];
  
    return (
      <div className="w-[180px] pt-2">
        <div className="flex flex-col gap-4 text-[18px] font-semibold text-[#6201E0]">
          {menus.map((menu) => (
            <div
              key={menu.label}
              onClick={() => navigate(menu.path)}
              className={`pl-4 border-l-[2px] cursor-pointer transition
                ${active === menu.label
                  ? 'text-[#6201E0] border-[#6201E0]'
                  : 'text-[#9d9d9d] border-transparent hover:text-[#6201E0] hover:border-[#6201E0]'}`}
            >
              {menu.label}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SidebarMenu;