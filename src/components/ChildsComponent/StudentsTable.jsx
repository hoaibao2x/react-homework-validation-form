import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentsTable extends Component {

  renderMangSV = () => {
    let number = 0;
    let stt = 0;
    return this.props.mangSinhVien.map((sinhVien) => {
      let { maSV, hoTen, sdt, email } = sinhVien;
      return <tr key={`sv-${number++}`}>
        <td>{stt += 1}</td>
        <td>{maSV}</td>
        <td>{hoTen}</td>
        <td>{sdt}</td>
        <td>{email}</td>
        <td className='text-center'>
          <button onClick={() => {
            let action = {
              type: 'XEM_SINH_VIEN',
              svInfo: sinhVien
            }
            this.props.dispatch(action);
          }} className="btn d-inline-block mr-2 btn-info">Xem</button>
          <button onClick={() => {
            let action = {
              type: 'XOA_SINH_VIEN',
              svXoa: maSV
            }
            this.props.dispatch(action);
          }} className="btn d-inline-block btn-danger">Xóa</button>
        </td>
      </tr>
    })
  }

  timKiemSV = (event) => {
    let action = {
      type: 'TIM_KIEM_SINH_VIEN',
      value: event.target.value
    }
    this.props.dispatch(action);
  }

  render() {
    return (
      <div>
        <div className="form-group text-left">
          <label htmlFor="svFind">Tìm kiếm sinh viên</label>
          <input onChange={(event) => {
            this.timKiemSV(event)
          }} id='svFind' type="text" className='form-control w-25' placeholder='Nhập họ & tên sinh viên' />
        </div>
        <table className="table">
          <thead className='bg-dark text-white'>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderMangSV()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.QLSinhVienReducer.mangSinhVien
  }
}

export default connect(mapStateToProps)(StudentsTable)