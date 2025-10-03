"use client";
import { useState, useEffect } from 'react';
import { useProvinceStore } from '@/zustand/useProvinceStore';
import { exportToExcel } from '@/utils/exportToExcel';
import useFetchProvinces from '@/hooks/useFetchProvinces';
import { Province } from '@/interfaces/type';
import Select from 'react-select';
import "../css/main.css";
import TableComponent from './TableComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SelectedProvince {
    value: string;
    label: string;
}

const ProvinceExport = () => {
    const [loading, setLoading] = useState(true);
    const [selectedProvince, setSelectedProvince] = useState<SelectedProvince | null>(null);
    const provinces = useProvinceStore((state) => state.provinces);

    useFetchProvinces();

    useEffect(() => {
        if (Array.isArray(provinces) && provinces.length > 0) {
            setLoading(false);
        }
    }, [provinces]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const data = provinces
        .filter((province: Province) => {
            if (!selectedProvince || selectedProvince.value === 'all') return true;
            return province.code === selectedProvince.value;
        })
        .flatMap((province: Province) =>
            province.communes?.map((commune) => ({
                provinceCode: province.code,
                provinceName: province.name,
                wardCode: commune.code,
                wardName: commune.name,
                combinedName: `${province.name}, ${commune.name}`,
            })) || []
        );

    const columns = [
        {
            header: 'Mã tỉnh',
            accessorKey: 'provinceCode',
        },
        {
            header: 'Tỉnh/Thành phố',
            accessorKey: 'provinceName',
        },
        {
            header: 'Mã xã/phường',
            accessorKey: 'wardCode',
        },
        {
            header: 'Tên xã/ phường',
            accessorKey: 'wardName',
        },
        {
            header: 'Tỉnh và Phường/Xã',
            accessorKey: 'combinedName',
        },
    ];

    const handleProvinceChange = (selectedOption: SelectedProvince | null) => {
        setSelectedProvince(selectedOption);
    };
    const handleExport = () => {
        exportToExcel(data);
        toast.success("Dữ liệu đã được xuất thành công!");
    };
    const provinceOptions = [
        { value: 'all', label: 'Tất cả' },
        ...provinces.map((province) => ({
            value: province.code,
            label: province.name,
        })),
    ];

    return (
        <div className="province-export">
            <h1 className="title">Danh sách tỉnh</h1>

            <div className="search-container">
                <Select
                    options={provinceOptions}
                    onChange={handleProvinceChange}
                    placeholder="Chọn tỉnh/thành phố"
                    value={selectedProvince}
                />
            </div>

            <button className="export-button" onClick={handleExport} disabled={loading}>
                Xuất Excel
            </button>

            <div className="table-container">
                <TableComponent columns={columns} data={data} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProvinceExport;
