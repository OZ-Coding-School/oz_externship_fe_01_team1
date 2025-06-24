import { useState } from "react";

export default function SignupForm() {
  const [nickname, setNickname] = useState("");
  const [nicknameValid, setNicknameValid] = useState<boolean | null>(null);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  const [phone, setPhone] = useState({ part1: "", part2: "", part3: "" });
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState<boolean | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const LabelWithAsterisk = ({ label }: { label: string }) => (
    <label className="block font-medium mb-1">
      <span className="text-black">{label}</span><span className="text-red-500">*</span>
    </label>
  );

  const inputClass = (status: boolean | null) => {
    if (status === null) return "w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500";
    if (status) return "w-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-purple-500";
    return "w-full border border-red-500 focus:outline-none focus:ring-2 focus:ring-purple-500";
  };

  const messageClass = (status: boolean | null) => {
    if (status === null) return "";
    if (status) return "text-green-600 text-sm mt-1";
    return "text-red-500 text-sm mt-1";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      <div className="text-center mb-10">
        <p className="text-sm text-gray-600">마법같이 빠르게 성장시켜줄</p>
        <h1 className="text-2xl font-extrabold text-indigo-900">oz. 오즈코딩스쿨</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <h2 className="text-left font-semibold text-lg">회원가입</h2>

        <div>
          <LabelWithAsterisk label="이름" />
          <input type="text" placeholder="이름을 입력해주세요" className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div>
          <LabelWithAsterisk label="닉네임" />
          <div className="flex space-x-2">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameChecked(false);
                setNicknameValid(null);
              }}
              placeholder="닉네임을 입력해주세요"
              className={inputClass(nicknameValid)}
            />
            <button
              disabled={nicknameChecked}
              onClick={() => {
                const isValid = nickname.length >= 2 && nickname.length <= 10;
                setNicknameValid(isValid);
                if (isValid) setNicknameChecked(true);
              }}
              className={`px-4 py-2 rounded font-semibold text-sm ${
                nicknameChecked ? "bg-gray-300 cursor-not-allowed" : "bg-purple-200"
              }`}
            >
              중복확인
            </button>
          </div>
          {nicknameValid === false && (
            <p className={messageClass(false)}>* 이미 사용 중인 닉네임입니다.</p>
          )}
          {nicknameValid === true && (
            <p className={messageClass(true)}>* 사용 가능한 닉네임입니다.</p>
          )}
        </div>

        <div>
          <LabelWithAsterisk label="생년월일" />
          <input
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="8자리 입력해주세요 (ex.20000101)"
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            <span className="text-black">이메일</span><span className="text-red-500">*</span>{" "}
            <span className="text-sm text-purple-600">로그인 시 아이디로 사용합니다.</span>
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 (example@gmail.com)"
              className="flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gray-200 px-4 py-2 rounded">인증번호전송</button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="인증번호 6자리를 입력해주세요"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              className="flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => setEmailVerified(emailCode === "123456")}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              인증번호확인
            </button>
          </div>
          {emailVerified === false && <p className={messageClass(false)}>* 인증번호가 일치하지 않습니다.</p>}
          {emailVerified === true && <p className={messageClass(true)}>* 이메일 인증이 완료되었습니다.</p>}
        </div>

        <div>
          <LabelWithAsterisk label="휴대전화" />
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={phone.part1}
              onChange={(e) => setPhone({ ...phone, part1: e.target.value })}
              placeholder="010"
              className="w-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={phone.part2}
              onChange={(e) => setPhone({ ...phone, part2: e.target.value })}
              className="w-1/4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              value={phone.part3}
              onChange={(e) => setPhone({ ...phone, part3: e.target.value })}
              className="w-1/4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gray-200 px-4 py-2 rounded">인증번호전송</button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="인증번호 6자리를 입력해주세요"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              className="flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => setPhoneVerified(phoneCode === "654321")}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              인증번호확인
            </button>
          </div>
          {phoneVerified === false && <p className={messageClass(false)}>* 인증번호가 일치하지 않습니다.</p>}
          {phoneVerified === true && <p className={messageClass(true)}>* 휴대전화 인증이 완료되었습니다.</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">
            <span className="text-black">비밀번호</span><span className="text-red-500">*</span>{" "}
            <span className="text-sm text-purple-600">6~15자의 영문 대소문자, 숫자 및 특수문자 포함</span>
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
          />
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordValid(e.target.value === password);
            }}
            className={inputClass(passwordValid)}
          />
          {passwordValid === false && <p className={messageClass(false)}>* 비밀번호가 일치하지 않습니다.</p>}
          {passwordValid === true && <p className={messageClass(true)}>* 비밀번호가 일치합니다.</p>}
        </div>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold disabled:bg-gray-300"
          disabled={!(nicknameValid && emailVerified && phoneVerified && passwordValid)}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}