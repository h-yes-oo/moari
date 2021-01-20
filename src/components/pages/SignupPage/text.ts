const text = {
    loginId: {
        description: '아이디',
        require:"아이디는 6~16자 영문, 숫자로 설정해주세요",
        duplicate:"이미 사용중인 아이디입니다",
        availabe: "사용 가능한 아이디입니다",
        check: "아이디를 다시 확인해주세요",
    },
    email: {
        description: '학교 이메일',
        require:"학교 이메일을 바르게 입력해주세요",
        school: "snu.ac.kr",
        check: "이메일을 다시 확인해주세요",
        duplicate: "이미 사용중인 메일 주소입니다",
        available: "사용 가능한 이메일입니다"
    },
    nickname: {
        description: '닉네임',
        require:"닉네임은 2~16자 한글, 영문, 숫자로 설정해주세요",
        duplicate:"이미 사용중인 닉네임입니다",
        availabe: "사용 가능한 닉네임입니다",
        check: "닉네임을 다시 확인해주세요"
    },
    password: {
        description: `비밀번호`,
        require:"비밀번호는 영문,숫자,특수기호를 포함하여 8~16자로 설정해주세요",
        availabe: "사용 가능한 비밀번호입니다",
        check: "비밀번호를 다시 확인해주세요"
    },
    confirmPassword: {
        description: `비밀번호 확인`,
        check: "비밀번호가 같지 않습니다",
        available: "비밀번호가 일치합니다"
    },
    agreement: {
        text: `이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구이용약관 어쩌구저쩌구`,
        require: "약관에 동의해주세요",
    },

}

export default text;