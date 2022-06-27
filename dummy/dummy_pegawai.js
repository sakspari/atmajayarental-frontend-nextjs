const list_pegawai = [
    { id: 'MGR-001', jabatan: 'manager', nama: 'rico', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'rico@gmail.com' },
    { id: 'CS-002', jabatan: 'customer service', nama: 'diana', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'diana@gmail.com' },
    { id: 'CS-003', jabatan: 'customer service', nama: 'riki', tanggal_lahir: '20-05-2000', jenis_kelamin: false, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'riki@gmail.com' },
    { id: 'CS-004', jabatan: 'customer service', nama: 'angela', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'angela@gmail.com' },
    { id: 'ADM-005', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: false, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
    { id: 'ADM-006', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
    { id: 'ADM-007', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
    { id: 'ADM-008', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: false, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
    { id: 'ADM-009', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: true, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
    { id: 'ADM-010', jabatan: 'administrator', nama: 'joko', tanggal_lahir: '20-05-2000', jenis_kelamin: false, alamat: 'asdajkshdkahsd', no_telp:'08122323123', email: 'joko@gmail.com' },
]

const pegawaiDummy = (state = list_pegawai, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default pegawaiDummy