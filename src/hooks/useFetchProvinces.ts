import { useEffect } from 'react';
import { useProvinceStore } from '@/zustand/useProvinceStore';
import { ApiResponse, Province, Commune } from '@/interfaces/type';

const useFetchProvinces = () => {
    const { setProvinces, setCommunesForProvince } = useProvinceStore();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const currentDate = new Date().toISOString().split('T')[0];

                const apiUrl = process.env.NEXT_PUBLIC_VIETNAM_API_URL;

                if (!apiUrl) {
                    console.error('API URL not configured!');
                    return;
                }

                const fullApiUrl = `${apiUrl}address-kit/${currentDate}/provinces`;

                const response = await fetch(fullApiUrl);
                if (!response.ok) {
                    console.error('Failed to fetch provinces:', response.statusText);
                    return;
                }

                const data: ApiResponse = await response.json();
                if (data && data.provinces) {
                    setProvinces(data.provinces);

                    for (const province of data.provinces) {
                        await fetchCommunes(province);
                    }
                } else {
                    console.error('Invalid data structure:', data);
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const fetchCommunes = async (province: Province) => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_VIETNAM_API_URL;

                if (!apiUrl) {
                    console.error('API URL not configured!');
                    return;
                }

                const communesApiUrl = `${apiUrl}address-kit/${new Date().toISOString().split('T')[0]}/provinces/${province.code}/communes`;

                const response = await fetch(communesApiUrl);
                if (!response.ok) {
                    console.error('Failed to fetch communes for province', province.code);
                    return;
                }

                const communeData = await response.json();

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
