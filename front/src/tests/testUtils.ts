import axios, { AxiosInstance } from "axios";

export const createMockAxiosInstance = (mockResponse: unknown) => {
    const mockAxiosInstance: Partial<AxiosInstance> = {
        post: jest.fn().mockResolvedValue({ data: mockResponse }),
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
        put: jest.fn().mockResolvedValue({ data: mockResponse }),
        delete: jest.fn().mockResolvedValue({ data: mockResponse }),
    };

    (axios.create as jest.Mock).mockReturnValue(
        mockAxiosInstance as AxiosInstance
    );

    return mockAxiosInstance as AxiosInstance;
};
