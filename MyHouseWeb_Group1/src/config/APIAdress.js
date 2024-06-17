const GHN_TOKEN = 'b08e0769-130e-11ec-b8c6-fade198b4859';
export const getCities = async () => {
    try {
        const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': GHN_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Lỗi fetch cities:', error);
        return [];
    }
};

export const getDistricts = async (selectedCityId) => {
    try {
        const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': GHN_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }

        const data = await response.json();
        const listDistrictByProvince = data.data.filter(item => item.ProvinceID == selectedCityId);
        return listDistrictByProvince || [];
    } catch (error) {
        console.error('Lỗi fetch districts:', error);
        return [];
    }
};

export const getWards = async (selectedDistrictId) => {
    try {
        const response = await fetch(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrictId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': GHN_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Lỗi fetch wards:', error);
        return [];
    }
};