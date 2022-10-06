import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentsTable extends Component {

  renderMangSV = () => {
    return this.props.mangSinhVien.map((sinhVien) => {
      let { maSV, hoTen, sdt, email } = sinhVien;

      return <tr key={`sv-${sinhVien.maSV}`}>
        <td>{maSV}</td>
        <td>{hoTen}</td>
        <td>{sdt}</td>
        <td>{email}</td>
        <td className='text-center'>
          <button className="btn d-inline-block mr-2 btn-info">Xem</button>
          <button className="btn d-inline-block btn-danger">Xóa</button>
        </td>
      </tr>
    })
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className='bg-dark text-white'>
            <tr>
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