import * as XLSX from 'xlsx';

export const exportToExcel = (data: { provinceCode: string; provinceName: string; wardCode: string; wardName: string; combinedName: string }[]) => {
    const formattedData = data.map((item) => ({
        'Mã tỉnh': item.provinceCode,
        'Tỉnh/Thành phố': item.provinceName,
        'Mã xã/phường': item.wardCode,
        'Tên xã/phường': item.wardName,
        'Tỉnh và Phường/Xã': item.combinedName,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Danh sách tỉnh và phường');

    XLSX.writeFile(wb, 'danh_sach_tinh_va_phuong.xlsx');
};
