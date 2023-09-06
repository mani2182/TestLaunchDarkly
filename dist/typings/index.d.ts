declare const useLaunchDarkly: (payload: string | null, tokenId: string, expiryTime: number) => {
    isLoading: boolean;
    apiData: object;
};
export default useLaunchDarkly;
