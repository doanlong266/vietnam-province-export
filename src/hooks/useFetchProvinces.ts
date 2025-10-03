import { useEffect } from 'react';
import { useProvinceStore } from '@/zustand/useProvinceStore';
import { ApiResponse, Province } from '@/interfaces/type';
import axios from 'axios';

const useFetchProvinces = () => {
    const { setProvinces, setCommunesForProvince } = useProvinceStore();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const date = process.env.NEXT_PUBLIC_API_DATE || new Date().toISOString().split('T')[0];
                const apiUrl = `/api/provinces?date=${date}`;

                const response = await axios.get(apiUrl);
                const data: ApiResponse = response.data;

                if (data && data.provinces) {
                    setProvinces(data.provinces);

                    for (const province of data.provinces) {
                        await fetchCommunes(province, date);
                    }
                } else {
                    console.error('Invalid data structure:', data);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const fetchCommunes = async (province: Province, date: string) => {
            try {
                const communesApiUrl = `/api/provinces/${province.code}/communes?date=${date}`;

                const response = await axios.get(communesApiUrl);
                const communeData = response.data;

                if (communeData && Array.isArray(communeData.communes)) {
                    setCommunesForProvince(province.code, communeData.communes);
                } else {
                    console.error('Invalid commune data structure:', communeData);
                }
            } catch (error) {
                console.error('Error fetching communes:', error);
            }
        };

        fetchProvinces();
    }, [setProvinces, setCommunesForProvince]);
};

export default useFetchProvinces;
