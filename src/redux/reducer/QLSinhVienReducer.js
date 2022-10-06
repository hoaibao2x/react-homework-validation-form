const initialState = {
    mangSinhVien: [
        {
            maSV: 1,
            hoTen: 'Nguyễn Văn A',
            sdt: '0123456789',
            email: 'vanA@gmail.com'
        },
        {
            maSV: 2,
            hoTen: 'Nguyễn Văn B',
            sdt: '0987654321',
            email: 'vanB@gmail.com'
        }
    ]
}

export const QLSinhVienReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state
    }
}
    