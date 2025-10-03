import { Commune, Province } from '@/interfaces/type';
import { create } from 'zustand';


interface ProvinceStore {
    provinces: Province[];
    setProvinces: (provinces: Province[]) => void;
    setCommunesForProvince: (provinceCode: string, communes: Commune[]) => void;
}

export const useProvinceStore = create<ProvinceStore>((set) => ({
    provinces: [],
    setProvinces: (provinces) => set({ provinces }),
    setCommunesForProvince: (provinceCode, communes) =>
        set((state) => ({
            provinces: state.provinces.map((province) =>
                province.code === provinceCode
                    ? { ...province, communes }
                    : province
            ),
        })),
}));