import Axios from 'axios';

export const marketSnapshot = async () => {
  console.log('Called market snapshot');
  let res = await Axios.get('***REMOVED***');
  return res.data.map((it: any) => {
    let data: any = {};
    try {
      data = JSON.parse(it.data);
    } catch (e) {
      console.error(e);
    }
    return {
      id: it.id,
      routineAtTime: it.routineAtTime,
      ...data,
    };
  });
};
