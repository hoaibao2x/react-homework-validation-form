const initialState = {
    mangSinhVien: [
        {
            maSV: 'sv01',
            hoTen: 'Lê Duy Hiếu',
            sdt: '0928325672',
            email: 'duyhieu@gmail.com'
        },
        {
            maSV: 'sv02',
            hoTen: 'Đặng Viễn Đông',
            sdt: '0387529812',
            email: 'viendong@gmail.com'
        },
        {
            maSV: 'sv03',
            hoTen: 'Nguyễn Lạc Phúc',
            sdt: '0383985502',
            email: 'lacphuc@gmail.com'
        },
        {
            maSV: 'sv04',
            hoTen: 'Trần Chí Thành',
            sdt: '0389627921',
            email: 'chithanh@gmail.com'
        },
        {
            maSV: 'sv05',
            hoTen: 'Bùi Huy Tuấn',
            sdt: '0389627218',
            email: 'huytuan@gmail.com'
        }
    ],
    sinhVien: {
        values: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: ''
        },
        errors: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: ''
        }
    },
    sinhVienEmpty: {
        maSV: '',
        hoTen: '',
        sdt: '',
        email: ''
    },
    isVisible: false
}



export const QLSinhVienReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'HANDLE_CHANGE':
            state.sinhVien = action.sinhVien;
            return { ...state }

        case 'THEM_SINH_VIEN':

            state.mangSinhVien = [...state.mangSinhVien, action.sinhVien]
            return { ...state }

        case 'XOA_SINH_VIEN':
            state.mangSinhVien = [...state.mangSinhVien.filter((sv) => {
                return sv.maSV !== action.svXoa;
            })]

            return { ...state }

        case 'XEM_SINH_VIEN':
            state.isVisible = true;
            state.sinhVien.values = action.svInfo;
            state.sinhVien = { ...state.sinhVien };
            return { ...state }

        case 'CAP_NHAT_SINH_VIEN':
            for (let i = 0; i < state.mangSinhVien.length; i++) {
                if (state.mangSinhVien[i].maSV === action.svCapNhat.maSV) {
                    state.mangSinhVien[i] = action.svCapNhat;
                }
            }

            // Check duplicate value in array
            for (let i = 0; i < state.mangSinhVien.length; i++) {
                for (let j = i + 1; j < state.mangSinhVien.length; j++) {
                    if (state.mangSinhVien[j].maSV === state.mangSinhVien[i].maSV) {
                        state.mangSinhVien.splice(j, 1);
                    }
                }
            }

            state.mangSinhVien = [...state.mangSinhVien];

            return { ...state }

        case 'TIM_KIEM_SINH_VIEN':

            return { ...state }

        case 'RESET_FORM':
            state.isVisible = false;
            state.sinhVien.values = state.sinhVienEmpty;
            state.sinhVien = { ...state.sinhVien }

            return { ...state }

        default:
            return { ...state }
    }
}
