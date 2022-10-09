const initialState = {
    mangSinhVien: [
        {
            maSV: '1',
            hoTen: 'Nguyễn Văn A',
            sdt: '0123456789',
            email: 'vanA@gmail.com'
        },
        {
            maSV: '2',
            hoTen: 'Nguyễn Văn B',
            sdt: '0987654321',
            email: 'vanB@gmail.com'
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
    }
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
                return sv.maSV !== action.svXoa
            })]
            return { ...state }

        default:
            return { ...state }
    }
}
