import React from "react";

function ModalUserEdit() {

    return (
        <>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                แก้ไขข้อมูลผู้ใช้งาน
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">แก้ไขข้อมูลผู้ใช้งาน</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label">เลขบัตรประชาชน</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ชื่อ</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">นามสกุล</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ที่อยู่</label>
                                    <input type="address" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">อายุ</label>
                                    <input type="number" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">สัญชาติ</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">เบอร์โทรศัพท์</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">อีเมล</label>
                                    <input type="email" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">รหัสผ่าน</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">สถานะผู้ใช้งาน</label>
                                    <input type="number" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                            <button type="button" class="btn btn-warning">แก้ไขข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUserEdit;