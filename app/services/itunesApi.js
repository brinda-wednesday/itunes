import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('iTunes');

export const getSongs = (searchTerm) => iTunesApi.get(`/search?term=${searchTerm}`);
