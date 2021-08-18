import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../itunesApi';

describe('iTunesApi tests', () => {
  const songName = 'faded';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
});
