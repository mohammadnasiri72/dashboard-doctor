import axios from 'axios';

export async function getAccount(token) {
  let account = '';
  axios
    .get('https://cis.aitest.ir/api/Patient/Get', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
     account = res.data;
    })
    .catch(() => {});
  return account;
}
